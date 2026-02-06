import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { layoutStyles } from '../../styles/screens/businessDetailsStyles';
import { formStyles } from '../../styles/screens/businessDetailsStyles';

export default function BusinessDetailsScreen({ navigation }) {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    companyPhone: '',
    companyEmail: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    description: '',
  });

  const handleSave = () => {
    console.log('Business Data:', formData);
    // Navigate to SocialMediaScreen (Step 3)
    navigation.navigate('SocialMediaScreen');
  };

  const navigateToDashboard = () => {
    navigation.goBack();
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
          onPress={navigateToDashboard}
        >
          <Ionicons name="chevron-back" size={28} color="#D4AF37" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={layoutStyles.appTitle}>
          BUSINESS DETAILS
        </Text>

        {/* Step Indicator */}
        <View style={layoutStyles.stepIndicator}>
          <Text style={layoutStyles.stepText}>2</Text>
        </View>
      </View>

      {/* ========== TITLE SECTION ========== */}
      <View style={layoutStyles.titleSection}>
        <Text style={layoutStyles.mainTitle}>
          Business Information
        </Text>
        <Text style={layoutStyles.subtitle}>
          Add your company details to your digital business card
        </Text>
      </View>

      {/* ========== FORM CARD SECTION ========== */}
      <View style={layoutStyles.formCard}>
        
        {/* Card Header */}
        <View style={layoutStyles.cardHeader}>
          <Text style={layoutStyles.cardTitle}>Company Details</Text>
          <Text style={layoutStyles.cardSubtitle}>
            All fields marked with * are mandatory
          </Text>
        </View>

        {/* Section 1: Basic Information */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Basic Information</Text>

          <InputField 
            label="Company Name *" 
            placeholder="Enter company name"
            icon="business"
            value={formData.companyName}
            onChangeText={(text) => setFormData({...formData, companyName: text})}
          />

          <InputField 
            label="Industry *" 
            placeholder="e.g., Technology, Finance"
            icon="briefcase"
            value={formData.industry}
            onChangeText={(text) => setFormData({...formData, industry: text})}
          />

          <InputField 
            label="Website" 
            placeholder="https://example.com"
            icon="globe"
            value={formData.website}
            onChangeText={(text) => setFormData({...formData, website: text})}
          />

          <InputField 
            label="Company Phone *" 
            placeholder="Company phone number"
            icon="call"
            keyboardType="phone-pad"
            value={formData.companyPhone}
            onChangeText={(text) => setFormData({...formData, companyPhone: text})}
          />

          <InputField 
            label="Company Email *" 
            placeholder="company@example.com"
            icon="mail"
            keyboardType="email-address"
            value={formData.companyEmail}
            onChangeText={(text) => setFormData({...formData, companyEmail: text})}
          />
        </View>

        {/* Section 2: Address Information */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Address Information</Text>

          <InputField 
            label="Address *" 
            placeholder="Street address"
            icon="location"
            multiline
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
          />

          <View style={layoutStyles.rowContainer}>
            <View style={layoutStyles.rowItem}>
              <InputField 
                label="City *" 
                placeholder="City"
                icon="home"
                value={formData.city}
                onChangeText={(text) => setFormData({...formData, city: text})}
              />
            </View>
            <View style={layoutStyles.rowItem}>
              <InputField 
                label="State *" 
                placeholder="State"
                icon="document"
                value={formData.state}
                onChangeText={(text) => setFormData({...formData, state: text})}
              />
            </View>
          </View>

          <View style={layoutStyles.rowContainer}>
            <View style={layoutStyles.rowItem}>
              <InputField 
                label="Zip Code *" 
                placeholder="Zip code"
                icon="pin"
                keyboardType="numeric"
                value={formData.zipCode}
                onChangeText={(text) => setFormData({...formData, zipCode: text})}
              />
            </View>
            <View style={layoutStyles.rowItem}>
              <InputField 
                label="Country *" 
                placeholder="Country"
                icon="earth"
                value={formData.country}
                onChangeText={(text) => setFormData({...formData, country: text})}
              />
            </View>
          </View>
        </View>

        {/* Section 3: Company Description */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Company Description</Text>

          <InputField 
            label="Description" 
            placeholder="Tell us about your company..."
            icon="document-text"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
          />
        </View>

        {/* Action Buttons */}
        <View style={layoutStyles.buttonGroup}>
          <TouchableOpacity 
            style={layoutStyles.saveButton}
            onPress={handleSave}
          >
            <Ionicons name="checkmark-done" size={18} color="#0F0F0F" />
            <Text style={layoutStyles.saveButtonText}>Step 3: Social Media</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={layoutStyles.skipButton}
            onPress={navigateToDashboard}
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

function InputField({ label, placeholder, icon, multiline, keyboardType, value, onChangeText }) {
  return (
    <View style={formStyles.inputWrapper}>
      <Text style={formStyles.label}>
        {label}
      </Text>
      <View style={[
        formStyles.inputContainer,
        multiline && formStyles.addressInputContainer
      ]}>
        <Ionicons 
          name={icon} 
          size={20} 
          color="#D4AF37" 
          style={[formStyles.inputIcon, multiline && formStyles.addressIcon]} 
        />
        <TextInput
          style={[
            formStyles.input,
            multiline && formStyles.addressInput
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
