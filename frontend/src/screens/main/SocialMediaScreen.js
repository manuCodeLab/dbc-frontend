import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { layoutStyles } from '../../styles/screens/socialMediaStyles';
import { formStyles } from '../../styles/screens/socialMediaStyles';

export default function SocialMediaScreen({ navigation }) {
  const [formData, setFormData] = useState({
    linkedin: '',
    instagram: '',
    twitter: '',
    facebook: '',
    youtube: '',
    companyLogo: null,
    profilePhoto: null,
    qrCode: null,
    businessCard: null,
  });

  const handleSave = () => {
    console.log('Social Media & Uploads Data:', formData);
    // Show success alert
    navigation.navigate('Home');
  };

  const navigateToBusinessDetails = () => {
    navigation.goBack();
  };

  const handleImagePicker = (field) => {
    // Placeholder for image picker functionality
    console.log(`Image picker for ${field}`);
  };

  return (
    <SafeAreaView style={layoutStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
      
      {/* ========== HEADER SECTION ========== */}
      <View style={layoutStyles.headerSection}>
        {/* Back Button */}
        <TouchableOpacity 
          style={layoutStyles.backButton}
          onPress={navigateToBusinessDetails}
        >
          <Ionicons name="chevron-back" size={28} color="#D4AF37" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={layoutStyles.appTitle}>
          SOCIAL MEDIA
        </Text>

        {/* Step Indicator */}
        <View style={layoutStyles.stepIndicator}>
          <Text style={layoutStyles.stepText}>3</Text>
        </View>
      </View>

      {/* ========== TITLE SECTION ========== */}
      <View style={layoutStyles.titleSection}>
        <Text style={layoutStyles.mainTitle}>
          Social Media & Uploads
        </Text>
        <Text style={layoutStyles.subtitle}>
          Add your social links and upload media to complete your card
        </Text>
      </View>

      {/* ========== FORM CARD SECTION ========== */}
      <View style={layoutStyles.formCard}>
        
        {/* Card Header */}
        <View style={layoutStyles.cardHeader}>
          <Text style={layoutStyles.cardTitle}>Step 3 of 3</Text>
          <Text style={layoutStyles.cardSubtitle}>
            Complete your digital business card
          </Text>
        </View>

        {/* Section 1: Social Links */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Social Media Links</Text>

          <InputField 
            label="LinkedIn" 
            placeholder="https://linkedin.com/in/yourprofile"
            icon="logo-linkedin"
            value={formData.linkedin}
            onChangeText={(text) => setFormData({...formData, linkedin: text})}
          />

          <InputField 
            label="Instagram" 
            placeholder="https://instagram.com/yourprofile"
            icon="logo-instagram"
            value={formData.instagram}
            onChangeText={(text) => setFormData({...formData, instagram: text})}
          />

          <InputField 
            label="Twitter" 
            placeholder="https://twitter.com/yourprofile"
            icon="logo-twitter"
            value={formData.twitter}
            onChangeText={(text) => setFormData({...formData, twitter: text})}
          />

          <InputField 
            label="Facebook" 
            placeholder="https://facebook.com/yourprofile"
            icon="logo-facebook"
            value={formData.facebook}
            onChangeText={(text) => setFormData({...formData, facebook: text})}
          />

          <InputField 
            label="YouTube" 
            placeholder="https://youtube.com/c/yourprofile"
            icon="logo-youtube"
            value={formData.youtube}
            onChangeText={(text) => setFormData({...formData, youtube: text})}
          />
        </View>

        {/* Section 2: Media Uploads */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Media Uploads</Text>

          {/* Company Logo Upload */}
          <TouchableOpacity 
            style={layoutStyles.uploadBox}
            onPress={() => handleImagePicker('companyLogo')}
          >
            <View style={layoutStyles.uploadContent}>
              <Ionicons name="image" size={32} color="#D4AF37" />
              <Text style={layoutStyles.uploadLabel}>Company Logo</Text>
              <Text style={layoutStyles.uploadHint}>Tap to upload (Max 5MB)</Text>
            </View>
            {formData.companyLogo && (
              <View style={layoutStyles.uploadedImage}>
                <Image 
                  source={{ uri: formData.companyLogo }} 
                  style={layoutStyles.uploadedImagePreview}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Profile Photo Upload */}
          <TouchableOpacity 
            style={layoutStyles.uploadBox}
            onPress={() => handleImagePicker('profilePhoto')}
          >
            <View style={layoutStyles.uploadContent}>
              <Ionicons name="person-circle" size={32} color="#D4AF37" />
              <Text style={layoutStyles.uploadLabel}>Profile Photo</Text>
              <Text style={layoutStyles.uploadHint}>Tap to upload (Max 5MB)</Text>
            </View>
            {formData.profilePhoto && (
              <View style={layoutStyles.uploadedImage}>
                <Image 
                  source={{ uri: formData.profilePhoto }} 
                  style={layoutStyles.uploadedImagePreview}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* QR Code Upload */}
          <TouchableOpacity 
            style={layoutStyles.uploadBox}
            onPress={() => handleImagePicker('qrCode')}
          >
            <View style={layoutStyles.uploadContent}>
              <Ionicons name="qr-code" size={32} color="#D4AF37" />
              <Text style={layoutStyles.uploadLabel}>QR Code</Text>
              <Text style={layoutStyles.uploadHint}>Tap to upload (Max 5MB)</Text>
            </View>
            {formData.qrCode && (
              <View style={layoutStyles.uploadedImage}>
                <Image 
                  source={{ uri: formData.qrCode }} 
                  style={layoutStyles.uploadedImagePreview}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Existing Visiting Card Upload */}
          <TouchableOpacity 
            style={layoutStyles.uploadBox}
            onPress={() => handleImagePicker('businessCard')}
          >
            <View style={layoutStyles.uploadContent}>
              <Ionicons name="card" size={32} color="#D4AF37" />
              <Text style={layoutStyles.uploadLabel}>Existing Visiting Card</Text>
              <Text style={layoutStyles.uploadHint}>Tap to upload (Max 5MB)</Text>
            </View>
            {formData.businessCard && (
              <View style={layoutStyles.uploadedImage}>
                <Image 
                  source={{ uri: formData.businessCard }} 
                  style={layoutStyles.uploadedImagePreview}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={layoutStyles.buttonGroup}>
          <TouchableOpacity 
            style={layoutStyles.saveButton}
            onPress={handleSave}
          >
            <Ionicons name="checkmark-done" size={18} color="#0F0F0F" />
            <Text style={layoutStyles.saveButtonText}>Save & Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={layoutStyles.skipButton}
            onPress={navigateToBusinessDetails}
          >
            <Ionicons name="arrow-back" size={18} color="#D4AF37" />
            <Text style={layoutStyles.skipButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InputField({ label, placeholder, icon, value, onChangeText }) {
  return (
    <View style={formStyles.inputWrapper}>
      <Text style={formStyles.label}>
        {label}
      </Text>
      <View style={formStyles.inputContainer}>
        <Ionicons 
          name={icon} 
          size={20} 
          color="#D4AF37" 
          style={formStyles.inputIcon} 
        />
        <TextInput
          style={formStyles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          keyboardType="url"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
