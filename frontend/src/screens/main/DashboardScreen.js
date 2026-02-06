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

import { layoutStyles } from '../../styles/screens/dashboardLayoutStyles';
import { formStyles } from '../../styles/screens/dashboardFormStyles';

export default function DashboardScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    phone1: '',
    phone2: '',
    email: '',
    address: '',
  });

  const handleSave = () => {
    console.log('Form Data:', formData);
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToBusinessDetails = () => {
    navigation.navigate('BusinessDetails');
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
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
          onPress={navigateToLanding}
          style={{ width: 24, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="chevron-back" size={28} color="#D4AF37" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={layoutStyles.appTitle}>
          DIGITAL BUSINESS CARD
        </Text>

        {/* Profile Icon */}
        <TouchableOpacity 
          style={layoutStyles.profileIcon}
          onPress={navigateToProfile}
        >
          <Text style={layoutStyles.profileIconText}>N</Text>
        </TouchableOpacity>
      </View>

      {/* ========== TITLE SECTION ========== */}
      <View style={layoutStyles.titleSection}>
        <Text style={layoutStyles.mainTitle}>
          Digital Business Card Creator
        </Text>
        <Text style={layoutStyles.subtitle}>
          Create your professional digital business card in minutes
        </Text>
      </View>

      {/* ========== FORM CARD SECTION ========== */}
      <View style={layoutStyles.formCard}>
        
        {/* Profile Information Header */}
        <View style={layoutStyles.cardHeader}>
          <Text style={layoutStyles.cardTitle}>Step 1 of 3</Text>
          <Text style={layoutStyles.cardSubtitle}>
            All fields marked with * are mandatory
          </Text>
        </View>

        {/* Personal Details Section */}
        <View style={layoutStyles.detailsSection}>
          <Text style={layoutStyles.sectionTitle}>Personal Details</Text>

          {/* Full Name */}
          <InputField 
            label="Full Name *" 
            placeholder="Enter full name"
            icon="person"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />

          {/* Designation */}
          <InputField 
            label="Designation *" 
            placeholder="Enter designation"
            icon="briefcase"
            value={formData.designation}
            onChangeText={(text) => setFormData({...formData, designation: text})}
          />

          {/* Phone Number */}
          <InputField 
            label="Phone Number *" 
            placeholder="10-digit phone number"
            icon="call"
            keyboardType="phone-pad"
            value={formData.phone1}
            onChangeText={(text) => setFormData({...formData, phone1: text})}
          />

          {/* Phone Number 2 (Optional) */}
          <InputField 
            label="Phone Number 2 (Optional)" 
            placeholder="Alternate number"
            icon="call"
            keyboardType="phone-pad"
            value={formData.phone2}
            onChangeText={(text) => setFormData({...formData, phone2: text})}
          />

          {/* Email */}
          <InputField 
            label="Email *" 
            placeholder="your.email@gmail.com"
            icon="mail"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />

          {/* Address */}
          <InputField 
            label="Address *" 
            placeholder="Enter address"
            icon="location"
            multiline
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={layoutStyles.saveButton}
          onPress={navigateToBusinessDetails}
        >
          <Ionicons name="checkmark-done" size={18} color="#0F0F0F" />
          <Text style={layoutStyles.saveButtonText}>Step 2: Business Details</Text>
        </TouchableOpacity>

        {/* Next Step Button */}
        <TouchableOpacity 
          style={layoutStyles.skipButton}
          onPress={navigateToLanding}
        >
          <Ionicons name="arrow-back" size={18} color="#D4AF37" />
          <Text style={layoutStyles.skipButtonText}>Go Back</Text>
        </TouchableOpacity>
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
