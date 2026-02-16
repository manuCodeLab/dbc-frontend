import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from '../../styles/screens/profileStyles';
import { COLORS } from '../../styles/colors';

import { apiCall } from '../../utils/api';
import Footer from '../../components/common/Footer';


export default function ProfileScreen({ navigation, route }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first: '',
    middle: '',
    last: '',
    phone: '',
    email: '',
    designation: '',
    bio: '',
    company: '',
    profileImage: null,
  });

  const [editedData, setEditedData] = useState(profileData);
    const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fromScreen = route?.params?.fromScreen || null;

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await apiCall('/profile/get-profile', { method: 'GET' });
        if (res.success && res.data) {
          setProfileData(res.data);
          setEditedData(res.data);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleImagePick = async () => {
    setImageUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setEditedData({ ...editedData, profileImage: result.assets[0].uri });
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick image');
    }
    setImageUploading(false);
  };
   

  const handleEditChange = (field, value) => {
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await apiCall('/profile/update-profile', {
        method: 'PUT',
        data: editedData,
      });
      if (res.success && res.data) {
        setProfileData(res.data);
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', res.error || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const handleLogout = async () => {
    try {
      const res = await apiCall('/profile/logout', { method: 'POST' });
      if (res.success) {
        navigation.replace('Splash');
      } else {
        Alert.alert('Error', res.error || 'Failed to logout');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
      {/* Header */}
      <View style={profileStyles.header}>
        <TouchableOpacity 
          onPress={navigateToLanding}
          style={{ width: 24, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.accent} />
        </TouchableOpacity>
        <Text style={profileStyles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons 
            name={isEditing ? 'close' : 'create'} 
            size={24} 
            color={COLORS.accent} 
          />
        </TouchableOpacity>
      </View>

      {/* Profile Avatar */}
      <View style={profileStyles.avatarContainer}>
        <TouchableOpacity onPress={isEditing ? handleImagePick : undefined}>
          <View style={profileStyles.avatar}>
            {editedData.profileImage ? (
              <Image
                source={{ uri: editedData.profileImage }}
                style={profileStyles.avatarImage}
              />
            ) : (
              <Text style={profileStyles.avatarText}>
                {profileData.first?.charAt(0).toUpperCase() || 'U'}
              </Text>
            )}
          </View>
          {isEditing && (
            <Text style={{ textAlign: 'center', color: COLORS.accent, marginTop: 4 }}>Upload Image</Text>
          )}
        </TouchableOpacity>
        {/* Done button for image upload */}
        {isEditing && editedData.profileImage && editedData.profileImage !== profileData.profileImage && (
          <TouchableOpacity
            style={profileStyles.saveButton}
            onPress={handleSave}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={profileStyles.saveButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Content Card */}
      <View style={profileStyles.card}>
        {/* First Name Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="person" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>First Name</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.first}
              onChangeText={(value) => handleEditChange('first', value)}
              editable={false}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.first}</Text>
          )}
        </View>

        {/* Middle Name Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="person" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Middle Name</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.middle}
              onChangeText={(value) => handleEditChange('middle', value)}
              placeholder="Enter your middle name"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.middle || 'N/A'}</Text>
          )}
        </View>

        {/* Last Name Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="person" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Last Name</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.last}
              onChangeText={(value) => handleEditChange('last', value)}
              editable={false}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.last}</Text>
          )}
        </View>

        {/* Designation Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="briefcase" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Designation</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.designation}
              onChangeText={(value) => handleEditChange('designation', value)}
              placeholder="Enter your designation"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.designation || 'Not specified'}</Text>
          )}
        </View>

        {/* Company Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="business" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Company</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.company}
              onChangeText={(value) => handleEditChange('company', value)}
              placeholder="Enter your company"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.company || 'Not specified'}</Text>
          )}
        </View>

        {/* Email Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="mail" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Email</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.email}
              onChangeText={(value) => handleEditChange('email', value)}
              keyboardType="email-address"
              editable={false}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.email}</Text>
          )}
        </View>

        {/* Phone Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="call" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Phone</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.phone}
              onChangeText={(value) => handleEditChange('phone', value)}
              keyboardType="phone-pad"
              editable={false}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.phone}</Text>
          )}
        </View>

        {/* Bio Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="document-text" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Bio</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={[profileStyles.editInput, profileStyles.bioInput]}
              value={editedData.bio}
              onChangeText={(value) => handleEditChange('bio', value)}
              placeholder="Enter your bio"
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.bio || 'Not specified'}</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      {isEditing && (
        <View style={profileStyles.buttonContainer}>
          <TouchableOpacity 
            style={profileStyles.cancelButton}
            onPress={handleCancel}
          >
            <Ionicons name="close" size={18} color={COLORS.primary} />
            <Text style={profileStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[profileStyles.cancelButton, { backgroundColor: COLORS.accent }]}
            onPress={handleSave}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={[profileStyles.cancelButtonText, { color: '#fff' }]}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity 
        style={profileStyles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={18} color="#FF0000" />
        <Text style={profileStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
      </ScrollView>
      <Footer 
        activeTab="profile" 
        navigation={navigation} 
        fromScreen={fromScreen || null}
      />
    </SafeAreaView>
  );
}
