import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderGradient from '../components/HeaderGradient';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/colors';

const SignupScreen = ({ navigation }) => {
  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <HeaderGradient style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => navigation?.goBack?.()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.appTitle}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
          </HeaderGradient>

          <View style={styles.card}>
            <InputField placeholder="First Name" value={first} onChangeText={setFirst} />
            <InputField placeholder="Middle Name (optional)" value={middle} onChangeText={setMiddle} />
            <InputField placeholder="Last Name" value={last} onChangeText={setLast} />
            <InputField
              placeholder="Mobile Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              showCountry
              countryCode="+91"
            />
            <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

            <PrimaryButton title="Validate OTP" onPress={() => {}} variant="primary" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'flex-start',
  },
  back: {
    marginBottom: 6,
  },
  backText: {
    color: '#FFF',
    fontSize: 20,
  },
  appTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    fontSize: 13,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});

export default SignupScreen;
