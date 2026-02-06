import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from '../../styles/screens/profileStyles';
import { COLORS } from '../../styles/colors';

export default function ProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Nandu Kumar',
    designation: 'Full Stack Developer',
    email: 'nandu@example.com',
    phone: '+91 9876543210',
    bio: 'Passionate about building digital solutions',
    company: 'Tech Solutions Inc.',
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleEditChange = (field, value) => {
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <ScrollView style={profileStyles.container}>
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
        <View style={profileStyles.avatar}>
          <Text style={profileStyles.avatarText}>
            {profileData.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Profile Content Card */}
      <View style={profileStyles.card}>
        {/* Name Field */}
        <View style={profileStyles.fieldWrapper}>
          <View style={profileStyles.fieldHeader}>
            <Ionicons name="person" size={18} color={COLORS.accent} />
            <Text style={profileStyles.fieldLabel}>Name</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={profileStyles.editInput}
              value={editedData.name}
              onChangeText={(value) => handleEditChange('name', value)}
              placeholder="Enter your name"
              placeholderTextColor="#999999"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.name}</Text>
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
              placeholderTextColor="#999999"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.designation}</Text>
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
              placeholderTextColor="#999999"
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.company}</Text>
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
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
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
              placeholder="Enter your phone"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
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
              placeholderTextColor="#999999"
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={profileStyles.fieldValue}>{profileData.bio}</Text>
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
        </View>
      )}

      {/* Additional Options */}
      <View style={profileStyles.optionsContainer}>
        <TouchableOpacity style={profileStyles.optionItem}>
          <Ionicons name="download" size={20} color={COLORS.accent} />
          <Text style={profileStyles.optionText}>Download Card</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.optionItem}>
          <Ionicons name="share-social" size={20} color={COLORS.accent} />
          <Text style={profileStyles.optionText}>Share Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        <TouchableOpacity style={profileStyles.optionItem}>
          <Ionicons name="settings" size={20} color={COLORS.accent} />
          <Text style={profileStyles.optionText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={profileStyles.buttonContainer}>
        <TouchableOpacity 
          style={profileStyles.saveButton}
          onPress={() => navigation.navigate('BusinessDetails')}
        >
          <Ionicons name="checkmark-done" size={18} color={COLORS.primary} />
          <Text style={profileStyles.saveButtonText}>Step 2: Business Info</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={profileStyles.cancelButton}
          onPress={navigateToLanding}
        >
          <Ionicons name="arrow-back" size={18} color={COLORS.accent} />
          <Text style={profileStyles.cancelButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={profileStyles.logoutButton}>
        <Ionicons name="log-out" size={18} color="#FF0000" />
        <Text style={profileStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}
