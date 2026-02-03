import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderGradient from '../components/HeaderGradient';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/colors';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <HeaderGradient style={styles.header}>
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>💼</Text>
            </View>
            <Text style={styles.appTitle}>Digital Business</Text>
            <Text style={styles.subtitle}>Grow your business digitally</Text>
          </HeaderGradient>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back</Text>

            <InputField
              placeholder="Enter mobile number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              showCountry
              countryCode="+91"
            />

            <PrimaryButton title="Send OTP" onPress={() => {}} variant="primary" />
            <PrimaryButton title="Login" onPress={() => {}} variant="outlined" />

            <View style={styles.bottomRow}>
              <Text style={styles.newText}>New here?</Text>
              <TouchableOpacity onPress={() => navigation?.navigate?.('Signup') }>
                <Text style={styles.signupText}> Create your account | Sign Up →</Text>
              </TouchableOpacity>
            </View>
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
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  iconWrap: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 14,
    borderRadius: 40,
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  appTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newText: {
    color: '#6B7280',
  },
  signupText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
