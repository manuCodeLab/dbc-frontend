import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveCardDraft } from '../../utils/storage';
import COLORS from '../../styles/colors';

export default function CreateCardPersonal({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    handle: '',
    subtitle: '',
  });

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      Alert.alert('Required Fields', 'Please fill in Name, Email, and Phone');
      return;
    }
    // save personal data into draft and navigate
    saveCardDraft(formData).catch(() => {});
    navigation.navigate('SelectTemplate', { cardData: formData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Your Card</Text>
      
      <TextInput 
        placeholder="Full Name *" 
        style={styles.input}
        value={formData.fullName}
        onChangeText={(text) => setFormData({...formData, fullName: text})}
      />
      
      <TextInput 
        placeholder="Job Title (e.g., Frontend Developer)" 
        style={styles.input}
        value={formData.jobTitle}
        onChangeText={(text) => setFormData({...formData, jobTitle: text})}
      />
      
      <TextInput 
        placeholder="Email *" 
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
      />
      
      <TextInput 
        placeholder="Phone *" 
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData({...formData, phone: text})}
      />
      
      <TextInput 
        placeholder="Location (e.g., Bangalore)" 
        style={styles.input}
        value={formData.location}
        onChangeText={(text) => setFormData({...formData, location: text})}
      />
      
      <TextInput 
        placeholder="Social Handle (e.g., @yourname)" 
        style={styles.input}
        value={formData.handle}
        onChangeText={(text) => setFormData({...formData, handle: text})}
      />
      
      <TextInput 
        placeholder="Subtitle (e.g., Founder)" 
        style={styles.input}
        value={formData.subtitle}
        onChangeText={(text) => setFormData({...formData, subtitle: text})}
      />
      
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.next} onPress={handleNext}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Continue to Templates</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, color: '#000' },
  input: { 
    height: 44, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  buttons: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  next: { 
    backgroundColor: COLORS.accent, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
});
