// // import React, { useState } from 'react';
// // import {
// //   View,
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/common/Header';
import InputField from '../../components/form/InputField';
import OtpInput from '../../components/form/OtpInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';

import { signupStyles } from '../../styles/screens/signupStyles';
import { apiFetch } from '../../utils/api';

export default function SignupScreen({ navigation }) {

  const [form, setForm] = useState({
    first: '',
    middle: '',
    last: '',
    phone: '',
    email: '',
    phoneOtp: '',
    emailOtp: '',
  });

  const [errors, setErrors] = useState({});

  const [phoneOtpVisible, setPhoneOtpVisible] = useState(false);
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // timers & cooldowns for UI-only behaviour
  const [timerPhone, setTimerPhone] = useState(0);
  const [timerEmail, setTimerEmail] = useState(0);
  const [wrongOtpPhoneCooldown, setWrongOtpPhoneCooldown] = useState(0);
  const [wrongOtpEmailCooldown, setWrongOtpEmailCooldown] = useState(0);

  const validPhone = v => /^[1-9]\d{9}$/.test(v);
  const validEmail = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = (name, value) => {
    let msg = '';
    if (name === 'first' && value.trim().length < 2) msg = 'Enter valid first name';
    if (name === 'middle' && value && value.trim().length < 2) msg = 'Only letters allowed';
    if (name === 'last' && value.trim().length < 2) msg = 'Enter valid last name';
    if (name === 'phone' && !validPhone(value)) msg = 'Enter valid 10 digit number';
    if (name === 'email' && value && !validEmail(value)) msg = 'Enter valid email';
    if (name === 'phoneOtp' && value && value.length !== 6) msg = 'Enter 6 digit OTP';
    if (name === 'emailOtp' && value && value.length !== 6) msg = 'Enter 6 digit OTP';

    setErrors(p => ({ ...p, [name]: msg }));
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

    if (name === 'phone') clean = value.replace(/\D/g, '').slice(0, 10);
    if (name === 'phoneOtp' || name === 'emailOtp') clean = value.replace(/\D/g, '').slice(0, 6);

    setForm(p => ({ ...p, [name]: clean }));
    validate(name, clean);

    if (name === 'phoneOtp') setPhoneVerified(false);
    if (name === 'emailOtp') setEmailVerified(false);
  };

  // ====================================================
  // SEND MOBILE OTP
  // ====================================================

  const sendPhoneOtp = async () => {

    const phone = form.phone.trim();

    if (!validPhone(phone)) {
      Alert.alert('Error', 'Enter valid mobile number');
      return;
    }

    try {

      const payload = {
        firstName: form.first,
        middleName: form.middle,
        lastName: form.last,
        mobileNumber: Number(phone),
        email: form.email.trim(),
      };

      const { data } = await apiFetch('/auth/mobile-signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data.status === 1) {
        // UI state for OTP flow
        setPhoneOtpVisible(true);
        setTimerPhone(30);
        setWrongOtpPhoneCooldown(0);
        Alert.alert('OTP sent to mobile');
      } else {
        Alert.alert('Error', data.message);
      }

    } catch {
      Alert.alert('Network error');
    }
  };

  // ====================================================
  // VERIFY MOBILE OTP (Creates account)
  // ====================================================

  const verifyPhoneOtp = async () => {

    try {

      const payload = {
        firstName: form.first,
        middleName: form.middle,
        lastName: form.last,
        mobileNumber: Number(form.phone),
        email: form.email.trim(),
      };

      const { data } = await apiFetch(
        `/auth/verify-phone-otp?otp=${form.phoneOtp}`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      if (data.status === 1) {

        setPhoneVerified(true);

        Alert.alert('Success', 'Mobile verified!');

      } else {
        Alert.alert('Error', data.message);
      }

    } catch {
      Alert.alert('Verification failed');
    }
  };

  // ====================================================
  // EMAIL OTP (OPTIONAL)
  // ====================================================

  const sendEmailOtp = async () => {

    const email = form.email.trim();

    if (!validEmail(email)) {
      Alert.alert('Error', 'Enter valid email');
      return;
    }

    try {

      const { data } = await apiFetch('/auth/send-email-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (data.status === 1) {
        setEmailOtpVisible(true);
        setTimerEmail(30);
        setWrongOtpEmailCooldown(0);
        Alert.alert('OTP sent to email');
      } else {
        Alert.alert('Error', data.message);
      }

    } catch {
      Alert.alert('Network error');
    }
  };

  const verifyEmailOtp = async () => {

    try {

      const { data } = await apiFetch('/auth/verify-email-otp', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          otp: form.emailOtp,
        }),
      });

      if (data.status === 1) {
        setEmailVerified(true);
        Alert.alert('Email verified!');
      } else {
        Alert.alert('Error', data.message);
      }

    } catch {
      Alert.alert('Verification failed');
    }
  };

  // Resend handlers (UI only — call existing send functions)
  const handleResendPhoneOtp = () => {
    if (wrongOtpPhoneCooldown > 0 || timerPhone > 0) {
      Alert.alert('Please Wait', `You can resend OTP in ${Math.max(wrongOtpPhoneCooldown, timerPhone)}s`);
      return;
    }
    sendPhoneOtp();
  };

  const handleResendEmailOtp = () => {
    if (wrongOtpEmailCooldown > 0 || timerEmail > 0) {
      Alert.alert('Please Wait', `You can resend OTP in ${Math.max(wrongOtpEmailCooldown, timerEmail)}s`);
      return;
    }
    sendEmailOtp();
  };

  // Timer effects
  useEffect(() => {
    let i;
    if (phoneOtpVisible && timerPhone > 0) {
      i = setInterval(() => setTimerPhone((t) => t - 1), 1000);
    }
    return () => clearInterval(i);
  }, [phoneOtpVisible, timerPhone]);

  useEffect(() => {
    let i;
    if (emailOtpVisible && timerEmail > 0) {
      i = setInterval(() => setTimerEmail((t) => t - 1), 1000);
    }
    return () => clearInterval(i);
  }, [emailOtpVisible, timerEmail]);

  useEffect(() => {
    let c;
    if (wrongOtpPhoneCooldown > 0) c = setInterval(() => setWrongOtpPhoneCooldown((t) => t - 1), 1000);
    return () => clearInterval(c);
  }, [wrongOtpPhoneCooldown]);

  useEffect(() => {
    let c;
    if (wrongOtpEmailCooldown > 0) c = setInterval(() => setWrongOtpEmailCooldown((t) => t - 1), 1000);
    return () => clearInterval(c);
  }, [wrongOtpEmailCooldown]);

  // ====================================================
  // AFTER ACCOUNT CREATED → GO TO LOGIN
  // ====================================================

  const handleCreateAccount = () => {
    navigation.replace('Login');
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <SafeAreaView style={signupStyles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[{ flexGrow: 1 }, signupStyles.scroll]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          <Header style={signupStyles.header}>
            <TouchableOpacity
              style={signupStyles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={signupStyles.title}>Create Account</Text>
            <Text style={signupStyles.subtitle}>Join us today</Text>
          </Header>

          <View style={signupStyles.card}>
            <InputField
              label="First Name"
              required
              icon="person-outline"
              placeholder="Enter first name"
              value={form.first}
              onChangeText={(v) => handleChange('first', v)}
              error={errors.first}
            />

            <InputField
              label="Middle Name (optional)"
              icon="person-outline"
              placeholder="Enter middle name"
              value={form.middle}
              onChangeText={(v) => handleChange('middle', v)}
              error={errors.middle}
            />

            <InputField
              label="Last Name"
              required
              icon="person-outline"
              placeholder="Enter last name"
              value={form.last}
              onChangeText={(v) => handleChange('last', v)}
              error={errors.last}
            />

            <InputField
              label="Mobile Number"
              required
              icon="call-outline"
              showCountry
              countryCode="+91"
              placeholder="Enter mobile number"
              value={form.phone}
              onChangeText={(v) => handleChange('phone', v)}
              keyboardType="number-pad"
              rightButton={
                phoneVerified
                  ? { label: '✔ Verified', disabled: true }
                  : {
                      label: 'Send OTP',
                      onPress: sendPhoneOtp,
                      disabled: !validPhone(form.phone) || timerPhone > 0,
                    }
              }
              error={errors.phone}
            />

            {phoneOtpVisible && (
              <>
                <OtpInput
                  length={6}
                  value={form.phoneOtp}
                  onChangeText={(v) => handleChange('phoneOtp', v)}
                  rightButton={{
                    label: phoneVerified ? 'Verified' : 'Verify',
                    onPress: verifyPhoneOtp,
                    disabled: form.phoneOtp.length !== 6 || phoneVerified,
                  }}
                />

                {!phoneVerified && (
                  <TouchableOpacity onPress={handleResendPhoneOtp} disabled={timerPhone > 0}>
                    <Text style={signupStyles.resend}>
                      {timerPhone > 0 ? `Resend OTP in ${timerPhone}s` : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            <InputField
              label="Email (optional)"
              icon="mail-outline"
              placeholder="Enter email"
              value={form.email}
              onChangeText={(v) => handleChange('email', v)}
              keyboardType="email-address"
              rightButton={
                form.email
                  ? emailVerified
                    ? { label: '✔ Verified', disabled: true }
                    : {
                        label: 'Send OTP',
                        onPress: sendEmailOtp,
                        disabled: !validEmail(form.email) || timerEmail > 0,
                      }
                  : null
              }
              error={errors.email}
            />

            {emailOtpVisible && form.email && (
              <>
                <OtpInput
                  length={6}
                  value={form.emailOtp}
                  onChangeText={(v) => handleChange('emailOtp', v)}
                  rightButton={{
                    label: emailVerified ? 'Verified' : 'Verify',
                    onPress: verifyEmailOtp,
                    disabled: form.emailOtp.length !== 6 || emailVerified,
                  }}
                />

                {!emailVerified && (
                  <TouchableOpacity onPress={handleResendEmailOtp} disabled={timerEmail > 0}>
                    <Text style={signupStyles.resend}>
                      {timerEmail > 0 ? `Resend OTP in ${timerEmail}s` : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            <PrimaryButton
              title="Submit"
              onPress={handleCreateAccount}
              disabled={!phoneVerified}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
