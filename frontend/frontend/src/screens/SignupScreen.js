import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HeaderGradient from '../components/HeaderGradient';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function SignupScreen({ navigation }) {
  const [otpVisible, setOtpVisible] = useState(false);
  const [timer, setTimer] = useState(30);

  const [form, setForm] = useState({
    first: '',
    middle: '',
    last: '',
    phone: '',
    email: '',
    otp: '',
  });

  const [errors, setErrors] = useState({});

  const validPhone = (v) => /^[6-9]\d{9}$/.test(v);
  const validEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  useEffect(() => {
    let i;
    if (otpVisible && timer > 0) {
      i = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(i);
  }, [otpVisible, timer]);

  const validate = (name, value) => {
    let msg = '';

    if (name === 'first' && value.length < 2) msg = 'Enter valid first name';
    if (name === 'middle' && value && value.length < 2) msg = 'Only letters allowed';
    if (name === 'last' && value.length < 2) msg = 'Enter valid last name';
    if (name === 'phone' && !validPhone(value)) msg = 'Enter valid 10 digit number';
    if (name === 'email' && !validEmail(value)) msg = 'Enter valid email';
    if (name === 'otp' && value.length !== 6) msg = 'Enter 6 digit OTP';

    setErrors((p) => ({ ...p, [name]: msg }));
  };

  const handleChange = (name, value) => {
    let clean = value;

    if (name === 'first' || name === 'middle')
      clean = value.replace(/[^A-Za-z]/g, '').slice(0, 15);

    if (name === 'last') {
      clean = value.replace(/[^A-Za-z ]/g, '');
      if ((clean.match(/ /g) || []).length > 1) return;
      clean = clean.slice(0, 10);
    }

    if (name === 'phone')
      clean = value.replace(/\D/g, '').slice(0, 10);

    if (name === 'otp')
      clean = value.replace(/\D/g, '').slice(0, 6);

    setForm((p) => ({ ...p, [name]: clean }));
    validate(name, clean);
  };

  const formValid =
    form.first.length >= 2 &&
    form.last.length >= 2 &&
    validPhone(form.phone) &&
    validEmail(form.email) &&
    !errors.first &&
    !errors.last &&
    !errors.phone &&
    !errors.email;

  const handleValidateOtp = () => {
    if (!formValid) {
      Alert.alert('Error', 'Please fix errors first');
      return;
    }
    Alert.alert('Dummy OTP', 'Your OTP is 123456');
    setOtpVisible(true);
    setTimer(30);
  };

  // ✅ UPDATED HERE
  const handleSubmit = () => {
    if (form.otp === '123456') {
      Alert.alert('Success', 'Account Created', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    } else {
      Alert.alert('Wrong OTP', 'Try again');
      setForm((p) => ({ ...p, otp: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderGradient style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
          </HeaderGradient>

          <View style={styles.card}>
            {/* Inputs unchanged */}
            <InputField label="First Name" required icon="person-outline" placeholder="Enter first name"
              value={form.first} onChangeText={(v) => handleChange('first', v)} error={errors.first} />

            <InputField label="Middle Name (optional)" icon="person-outline" placeholder="Enter middle name"
              value={form.middle} onChangeText={(v) => handleChange('middle', v)} error={errors.middle} />

            <InputField label="Last Name" required icon="person-outline" placeholder="Enter last name"
              value={form.last} onChangeText={(v) => handleChange('last', v)} error={errors.last} />

            <InputField label="Mobile Number" required icon="call-outline" showCountry countryCode="+91"
              placeholder="Enter mobile number" value={form.phone}
              onChangeText={(v) => handleChange('phone', v)} error={errors.phone} keyboardType="number-pad" />

            <InputField label="Email" required icon="mail-outline" placeholder="Enter email"
              value={form.email} onChangeText={(v) => handleChange('email', v)}
              error={errors.email} keyboardType="email-address" />

            <PrimaryButton title="Validate OTP" disabled={!formValid} onPress={handleValidateOtp} />

            {otpVisible && (
              <>
                <View style={styles.otpBox}>
                  <TextInput
                    placeholder="Enter OTP"
                    keyboardType="number-pad"
                    value={form.otp}
                    onChangeText={(v) => handleChange('otp', v)}
                    style={{ fontSize: 16 }}
                  />
                </View>

                <TouchableOpacity onPress={() => setTimer(30)} disabled={timer > 0}>
                  <Text style={styles.resend}>
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>

                <PrimaryButton
                  title="Submit"
                  disabled={form.otp.length !== 6}
                  onPress={handleSubmit}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fb' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: { height: 230, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
  backBtn: { position: 'absolute', left: 20, top: 55, backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 30 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  subtitle: { color: '#fff', marginTop: 6 },
  card: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: -55, borderRadius: 28, padding: 22, elevation: 6 },
  otpBox: { borderWidth: 2, borderColor: '#6b0f1a', borderRadius: 22, height: 58, justifyContent: 'center', paddingHorizontal: 14, marginTop: 15 },
  resend: { textAlign: 'center', marginTop: 10, color: '#6b0f1a', fontWeight: '600' },
});
