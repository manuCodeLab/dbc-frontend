import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { layoutStyles } from '../../styles/screens/dashboardLayoutStyles';
import { formStyles } from '../../styles/screens/dashboardFormStyles';

export default function DashboardScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    phone1: '',
    phone2: '',
    email: '',
    address: '',
  });

  return (
    <ScrollView style={layoutStyles.container}>
      
      {/* Header */}
      <View style={layoutStyles.header}>
        <View style={layoutStyles.logoBox}>
          <Ionicons name="document" size={28} color="#FFFFFF" />
        </View>
        <Text style={layoutStyles.headerTitle}>
          DIGITAL BUSINESS CARD
        </Text>
        <View style={layoutStyles.profileCircle}>
          <Text style={layoutStyles.profileText}>N</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={layoutStyles.mainTitle}>
        Digital Business Card Creator
      </Text>
      <Text style={layoutStyles.subtitle}>
        Create your professional digital business card in minutes
      </Text>

      {/* Card */}
      <View style={layoutStyles.card}>
        <Text style={layoutStyles.cardTitle}>Profile Information</Text>
        <Text style={layoutStyles.cardSubtitle}>
          All fields marked with * are mandatory
        </Text>

        <Text style={layoutStyles.sectionTitle}>Personal Details</Text>

        <Input 
          label="Full Name *" 
          placeholder="Enter full name"
          icon="person"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
        />
        <Input 
          label="Designation *" 
          placeholder="Enter designation"
          icon="briefcase"
          value={formData.designation}
          onChangeText={(text) => setFormData({...formData, designation: text})}
        />
        <Input 
          label="Phone Number *" 
          placeholder="10-digit phone number"
          icon="call"
          keyboardType="phone-pad"
          value={formData.phone1}
          onChangeText={(text) => setFormData({...formData, phone1: text})}
        />
        <Input 
          label="Phone Number 2 (Optional)" 
          placeholder="Alternate number"
          icon="call"
          keyboardType="phone-pad"
          value={formData.phone2}
          onChangeText={(text) => setFormData({...formData, phone2: text})}
        />
        <Input 
          label="Email *" 
          placeholder="your.email@gmail.com"
          icon="mail"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
        <Input 
          label="Address *" 
          placeholder="Enter address"
          icon="location"
          multiline
          value={formData.address}
          onChangeText={(text) => setFormData({...formData, address: text})}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={layoutStyles.submitButton}>
        <Text style={layoutStyles.submitButtonText}>Create Card</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function Input({ label, placeholder, icon, multiline, keyboardType, value, onChangeText }) {
  return (
    <View style={formStyles.inputWrapper}>
      <Text style={formStyles.label}>
        {label}
      </Text>
      <View style={formStyles.inputContainer}>
        <Ionicons name={icon} size={20} color="#D4AF37" style={formStyles.inputIcon} />
        <TextInput
          style={[
            formStyles.input,
            multiline && formStyles.multilineInput
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          multiline={multiline}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
