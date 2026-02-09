import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { layoutStyles } from '../../styles/screens/businessDetailsStyles';
import { formStyles } from '../../styles/screens/businessDetailsStyles';

// Validation rules for Business Details
const validations = {
  companyName: {
    minLength: 2,
    required: true,
    message: 'Company name must be at least 2 characters',
  },
  industry: {
    required: true,
    message: 'Industry/Category is required',
  },
  website: {
    urlFormat: true,
    required: false,
    message: 'Enter valid website URL (e.g., https://example.com)',
  },
  address: {
    minLength: 5,
    required: true,
    message: 'Address must be at least 5 characters',
  },
  city: {
    lettersOnly: true,
    required: true,
    message: 'City must contain letters only',
  },
  zipCode: {
    exactLength: 6,
    numbersOnly: true,
    required: true,
    message: 'Pincode must be exactly 6 digits',
  },
};

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

  const [errors, setErrors] = useState({});

  // Validate single field
  const validateField = (name, value) => {
    const rule = validations[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) {
      return `${name.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }

    if (!rule.required && !value.trim()) {
      return '';
    }

    if (name === 'companyName') {
      if (value.trim().length < rule.minLength) {
        return `Company name must be at least ${rule.minLength} characters`;
      }
    }

    if (name === 'address') {
      if (value.trim().length < rule.minLength) {
        return `Address must be at least ${rule.minLength} characters`;
      }
    }

    if (name === 'city') {
      if (!/^[a-zA-Z\s]{2,}$/.test(value.trim())) {
        return 'City must contain letters only';
      }
    }

    if (name === 'zipCode') {
      const digits = value.replace(/\D/g, '');
      if (value && digits.length !== rule.exactLength) {
        return `Pincode must be exactly ${rule.exactLength} digits`;
      }
      if (value && !/^[0-9]*$/.test(digits)) {
        return 'Pincode must contain numbers only';
      }
    }

    if (name === 'website' && value) {
      if (!/^https?:\/\/.+\..+/.test(value)) {
        return 'Enter valid website URL (must start with http:// or https://)';
      }
    }

    return '';
  };

  // Handle field change
  const handleFieldChange = (name, value) => {
    let cleanedValue = value;

    // Clean based on field type
    if (name === 'companyName') {
      cleanedValue = value.slice(0, 50);
    } else if (name === 'city') {
      cleanedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30);
    } else if (name === 'zipCode') {
      cleanedValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData({ ...formData, [name]: cleanedValue });

    // Real-time validation
    const error = validateField(name, cleanedValue);
    setErrors({ ...errors, [name]: error });
  };

  // Validate all fields before saving
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validations).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateAllFields()) {
      console.log('Business Data:', formData);
      navigation.navigate('SocialMediaScreen');
    } else {
      Alert.alert('Validation Error', 'Please fix all errors before proceeding');
    }
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
          <Text style={layoutStyles.cardTitle}>Step 2 of 3</Text>
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
            onChangeText={(text) => handleFieldChange('companyName', text)}
            error={errors.companyName}
            maxLength={50}
          />

          <InputField 
            label="Industry/Category *" 
            placeholder="e.g., Technology, Finance"
            icon="briefcase"
            value={formData.industry}
            onChangeText={(text) => setFormData({...formData, industry: text})}
            error={errors.industry}
          />

          <InputField 
            label="Website (Optional)" 
            placeholder="https://example.com"
            icon="globe"
            value={formData.website}
            onChangeText={(text) => handleFieldChange('website', text)}
            error={errors.website}
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
            label="Address * (min 5 chars)" 
            placeholder="Street address"
            icon="location"
            multiline
            value={formData.address}
            onChangeText={(text) => handleFieldChange('address', text)}
            error={errors.address}
          />

          <View style={layoutStyles.rowContainer}>
            <View style={layoutStyles.rowItem}>
              <InputField 
                label="City * (letters only)" 
                placeholder="City"
                icon="home"
                value={formData.city}
                onChangeText={(text) => handleFieldChange('city', text)}
                error={errors.city}
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
                label="Pincode * (6 digits)" 
                placeholder="Zip code"
                icon="pin"
                keyboardType="numeric"
                value={formData.zipCode}
                onChangeText={(text) => handleFieldChange('zipCode', text)}
                error={errors.zipCode}
                maxLength={6}
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

function InputField({ label, placeholder, icon, multiline, keyboardType, value, onChangeText, maxLength, error }) {
  const renderLabel = () => {
    if (!label) return null;
    
    const parts = label.split('*');
    
    if (parts.length === 1) {
      return <Text style={formStyles.label}>{label}</Text>;
    }
    
    return (
      <Text style={formStyles.label}>
        {parts[0]}
        <Text style={{ color: '#EF4444', fontWeight: '700' }}>*</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={formStyles.inputWrapper}>
      {renderLabel()}
      <View style={[
        formStyles.inputContainer,
        multiline && formStyles.addressInputContainer,
        error && { borderColor: '#EF4444', borderWidth: 2 }
      ]}>
        <Ionicons 
          name={icon} 
          size={20} 
          color={error ? '#EF4444' : '#D4AF37'} 
          style={[formStyles.inputIcon, multiline && formStyles.addressIcon]} 
        />
        <TextInput
          style={[
            formStyles.input,
            multiline && formStyles.addressInput,
            error && { color: '#EF4444' }
          ]}
          placeholder={placeholder}
          placeholderTextColor={error ? '#FCA5A5' : '#A0AEC0'}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          keyboardType={keyboardType}
          maxLength={maxLength}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {error && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Ionicons name="alert-circle" size={14} color="#EF4444" />
          <Text style={{ color: '#EF4444', fontSize: 12, marginLeft: 4, fontWeight: '500' }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
