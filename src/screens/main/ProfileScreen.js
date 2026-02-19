import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Footer from '../../components/common/Footer';
import { profileStyles } from '../../styles/screens/profileStyles';
import { COLORS } from '../../styles/colors';

import { apiFetch } from '../../utils/api';

export default function ProfileScreen({ navigation }) {

  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadProfile = async () => {

      try {

        const { res, data } = await apiFetch('/user/profile', {
          method: 'GET',
        });

        if (res.status === 401) {
          Alert.alert('Session expired', 'Please login again');
          navigation.replace('Login');
          return;
        }

        if (data.status === 1) {
          setProfile(data.data);
          setEditedProfile(data.data);
        } else {
          Alert.alert('Error', data.message || 'Failed to load profile');
        }

      } catch {
        Alert.alert('Network error');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

  }, []);

  const handleSave = async () => {

    try {

      const { data } = await apiFetch('/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editedProfile.firstName,
          middleName: editedProfile.middleName, 
          lastName: editedProfile.lastName,
          email: editedProfile.email,
        }),
      });

      if (data.status === 1) {
        setProfile(data.data);
        setEditedProfile(data.data);
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated');
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }

    } catch {
      Alert.alert('Update failed');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = async () => {

    try {
      await apiFetch('/user/logout', { method: 'POST' });
    } catch {}

    navigation.replace('Login');
  };
  if (loading) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
          <Text>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) return null;

  
  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ===== HEADER ===== */}
        <View style={profileStyles.header}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.accent} />
          </TouchableOpacity>

          <Text style={profileStyles.headerTitle}>
            My Profile
          </Text>

          {/* ✏️ EDIT TOGGLE */}
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? "close" : "create"}
              size={24}
              color={COLORS.accent}
            />
          </TouchableOpacity>

        </View>

        {/* ===== PROFILE CARD ===== */}
        <View style={profileStyles.card}>

          <Field
            label="First Name"
            value={isEditing ? editedProfile.firstName : profile.firstName}
            editable={isEditing}
            onChange={(v) => setEditedProfile({ ...editedProfile, firstName: v })}
          />

          {/* ⭐ MIDDLE NAME */}
          <Field
            label="Middle Name"
            value={isEditing ? editedProfile.middleName : profile.middleName}
            editable={isEditing}
            onChange={(v) => setEditedProfile({ ...editedProfile, middleName: v })}
          />

          <Field
            label="Last Name"
            value={isEditing ? editedProfile.lastName : profile.lastName}
            editable={isEditing}
            onChange={(v) => setEditedProfile({ ...editedProfile, lastName: v })}
          />

          <Field
            label="Email"
            value={isEditing ? editedProfile.email : profile.email}
            editable={isEditing}
            onChange={(v) => setEditedProfile({ ...editedProfile, email: v })}
          />

          {/* READ ONLY */}
          <Field
            label="Mobile"
            value={profile.mobileNumber}
            editable={false}
          />

        </View>

        {/* ===== SAVE / CANCEL ===== */}
        {isEditing && (
          <View style={profileStyles.buttonContainer}>

            <TouchableOpacity
              style={profileStyles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={profileStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[profileStyles.cancelButton, { backgroundColor: COLORS.accent }]}
              onPress={handleSave}
            >
              <Text style={[profileStyles.cancelButtonText, { color: '#fff' }]}>
                Save
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* ===== LOGOUT ===== */}
        <TouchableOpacity
          style={profileStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={18} color="#FF0000" />
          <Text style={profileStyles.logoutButtonText}>
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ===== FOOTER ===== */}
      <Footer activeTab="profile" navigation={navigation} />

    </SafeAreaView>
  );
}


// =========================
// REUSABLE FIELD COMPONENT
// =========================
function Field({ label, value, editable, onChange }) {
  return (
    <View style={profileStyles.fieldWrapper}>
      <Text style={profileStyles.fieldLabel}>{label}</Text>

      {editable ? (
        <TextInput
          style={profileStyles.editInput}
          value={value || ''}
          onChangeText={onChange}
        />
      ) : (
        <Text style={profileStyles.fieldValue}>
          {value || 'Not provided'}
        </Text>
      )}
    </View>
  );
}
