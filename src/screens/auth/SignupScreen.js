import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import InputField from '../../components/form/InputField';
import OtpInput from '../../components/form/OtpInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS } from '../../styles/colors';
import { signupStyles } from '../../styles/screens/signupStyles';

import { mobileSignupUser } from '../../utils/api';

// Generate random OTP
const generateOTP = (length = 4) => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1)));
};

export default function SignupScreen({ navigation }) {
  const [otpVisiblePhone, setOtpVisiblePhone] = useState(false);
  const [otpVisibleEmail, setOtpVisibleEmail] = useState(false);
  const [timerPhone, setTimerPhone] = useState(30);
  const [timerEmail, setTimerEmail] = useState(30);
  const [generatedOtpPhone, setGeneratedOtpPhone] = useState('');
  const [generatedOtpEmail, setGeneratedOtpEmail] = useState('');
  const [otpPhoneVerified, setOtpPhoneVerified] = useState(false);
  const [otpEmailVerified, setOtpEmailVerified] = useState(false);
  const [wrongOtpPhoneCooldown, setWrongOtpPhoneCooldown] = useState(0);
  const [wrongOtpEmailCooldown, setWrongOtpEmailCooldown] = useState(0);

  const [form, setForm] = useState({
    first: '',
    middle: '',
    last: '',
    phone: '',
    email: '',
    otpPhone: '',
    otpEmail: '',
  });

  const [errors, setErrors] = useState({}); 

  const validPhone = (v) => /^[1-9]\d{9}$/.test(v);
  const validEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  useEffect(() => {
    let i;
    if (otpVisiblePhone && timerPhone > 0) {
      i = setInterval(() => setTimerPhone((t) => t - 1), 1000);
    }
    return () => clearInterval(i);
  }, [otpVisiblePhone, timerPhone]);

  useEffect(() => {
    let i;
    if (otpVisibleEmail && timerEmail > 0) {
      i = setInterval(() => setTimerEmail((t) => t - 1), 1000);
    }
    return () => clearInterval(i);
  }, [otpVisibleEmail, timerEmail]);

  useEffect(() => {
    let cooldownInterval;
    if (wrongOtpPhoneCooldown > 0) {
      cooldownInterval = setInterval(() => setWrongOtpPhoneCooldown((t) => t - 1), 1000);
    }
    return () => clearInterval(cooldownInterval);
  }, [wrongOtpPhoneCooldown]);

  useEffect(() => {
    let cooldownInterval;
    if (wrongOtpEmailCooldown > 0) {
      cooldownInterval = setInterval(() => setWrongOtpEmailCooldown((t) => t - 1), 1000);
    }
    return () => clearInterval(cooldownInterval);
  }, [wrongOtpEmailCooldown]);

  const validate = (name, value) => {
    let msg = '';

    if (name === 'first' && value.length < 2) msg = 'Enter valid first name';
    if (name === 'middle' && value && value.length < 2) msg = 'Only letters allowed';
    if (name === 'last' && value.length < 2) msg = 'Enter valid last name';
    if (name === 'phone' && !validPhone(value)) msg = 'Enter valid 10 digit number';
    if (name === 'email' && value && !validEmail(value)) msg = 'Enter valid email';
    if (name === 'otpPhone' && value.length !== 6) msg = 'Enter 6 digit OTP';
    if (name === 'otpEmail' && value.length !== 6) msg = 'Enter 6 digit OTP';

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

    if (name === 'otpPhone' || name === 'otpEmail')
      clean = value.replace(/\D/g, '').slice(0, 6);

    setForm((p) => ({ ...p, [name]: clean }));
    validate(name, clean);
    if (name === 'otpPhone') setOtpPhoneVerified(false);
    if (name === 'otpEmail') setOtpEmailVerified(false);
  };

  const formValid =
    form.first.length >= 2 &&
    form.last.length >= 2 &&
    validPhone(form.phone) &&
    (!form.email || validEmail(form.email)) &&
    !errors.first &&
    !errors.last &&
    !errors.email;

  const phoneValid = validPhone(form.phone) && !errors.phone;
  const emailValid = !form.email || (validEmail(form.email) && !errors.email);

  const canSubmit =
    form.first.length >= 2 &&
    form.last.length >= 2 &&
    phoneValid &&
    emailValid &&
    form.otpPhone.length === 6 &&
    (!form.email || form.otpEmail.length === 6) &&
    !errors.first &&
    !errors.last &&
    !errors.phone &&
    !errors.email &&
    otpPhoneVerified &&
    (!form.email || otpEmailVerified);

  // Send phone OTP using /auth/mobile-signup with all user info
  const handleValidateOtpPhone = async () => {
    if (wrongOtpPhoneCooldown > 0) {
      Alert.alert('Please Wait', `You can request OTP again in ${wrongOtpPhoneCooldown} seconds`);
      return;
    }
    if (!phoneValid) {
      Alert.alert('Error', 'Enter a valid phone number');
      return;
    }
    if (form.first.length < 2 || form.last.length < 2) {
      Alert.alert('Error', 'Please enter valid first and last name');
      return;
    }
    try {
      const payload = {
        firstName: form.first,
        middleName: form.middle,
        lastName: form.last,
        mobileNumber: form.phone
      };
      console.log('Sending OTP request:', payload);
      const curl = `curl -X POST http://192.168.31.173:9090/auth/mobile-signup -H "Content-Type: application/json" -d '${JSON.stringify(payload)}'`;
      console.log('CURL command:', curl);
      const res = await fetch('http://192.168.31.173:9090/auth/mobile-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('OTP response status:', res.status);
      const data = await res.json();
      console.log('OTP response data:', data);
      if (res.ok && data.status === 1) {
        setOtpPhoneVerified(false);
        setOtpVisiblePhone(true);
        setTimerPhone(30);
        setWrongOtpPhoneCooldown(0);
        Alert.alert('Success', data.message || 'OTP sent to your mobile number.');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP request error:', err);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  // Send email OTP using backend
  const handleValidateOtpEmail = async () => {
    if (wrongOtpEmailCooldown > 0) {
      Alert.alert('Please Wait', `You can request OTP again in ${wrongOtpEmailCooldown} seconds`);
      return;
    }
    if (!form.email) {
      setOtpEmailVerified(true);
      return;
    }
    if (!emailValid) {
      Alert.alert('Error', 'Enter a valid email');
      return;
    }
    try {
      // Use backend endpoint for sending email OTP
      const res = await fetch('http://192.168.31.173:9090/auth/send-otp-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpEmailVerified(false);
        setOtpVisibleEmail(true);
        setTimerEmail(30);
        setWrongOtpEmailCooldown(0);
        Alert.alert('Email OTP', 'OTP sent to your email.');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  // Resend phone OTP using backend
  const handleResendPhoneOtp = async () => {
    if (wrongOtpPhoneCooldown > 0) {
      Alert.alert('Please Wait', `You can resend OTP again in ${wrongOtpPhoneCooldown} seconds`);
      return;
    }
    if (otpPhoneVerified) return;
    if (!phoneValid) {
      Alert.alert('Error', 'Enter a valid phone number');
      return;
    }
    try {
      const url = 'http://192.168.31.173:9090/auth/resend-mobile-otp';
      const payload = { mobileNumber: form.phone };
      console.log('[DEBUG] Resend phone OTP:', { url, payload });
      console.log('[DEBUG] curl command:', `curl -X POST '${url}' -H 'Content-Type: application/json' -d '${JSON.stringify(payload)}'`);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log('[DEBUG] Response:', data);
      if (res.ok && data.success) {
        setOtpPhoneVerified(false);
        setOtpVisiblePhone(true);
        setTimerPhone(30);
        Alert.alert('Phone OTP', 'OTP resent to your mobile number.');
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.log('[DEBUG] Resend phone OTP error:', err);
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  // Resend email OTP using backend
  const handleResendEmailOtp = async () => {
    if (wrongOtpEmailCooldown > 0) {
      Alert.alert('Please Wait', `You can resend OTP again in ${wrongOtpEmailCooldown} seconds`);
      return;
    }
    if (otpEmailVerified) return;
    if (!form.email) {
      setOtpEmailVerified(true);
      return;
    }
    if (!emailValid) {
      Alert.alert('Error', 'Enter a valid email');
      return;
    }
    try {
      const res = await fetch('http://192.168.31.173:9090/auth/resend-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpEmailVerified(false);
        setOtpVisibleEmail(true);
        setTimerEmail(30);
        Alert.alert('Email OTP', 'OTP resent to your email.');
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  // Verify phone OTP using backend
  const handleVerifyPhoneOtp = async () => {
    console.log('[DEBUG] phone and OTP:', { mobileNumber: form.phone, otp: form.otpPhone });
    try {
      const url = 'http://192.168.31.173:9090/auth/verify-number-otp';
      const payload = { mobileNumber: form.phone, otp: form.otpPhone };
      console.log('[DEBUG] Verifying phone OTP:', { url, payload });
      console.log('[DEBUG] curl command:', `curl -X POST '${url}' -H 'Content-Type: application/json' -d '${JSON.stringify(payload)}'`);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log('[DEBUG] Response:', data);
      if (res.ok && data.status === 1) {
        setOtpPhoneVerified(true);
        Alert.alert('Verified', data.message || 'Phone OTP verified');
      } else {
        setOtpPhoneVerified(false);
        setForm((p) => ({ ...p, otpPhone: '' }));
        setWrongOtpPhoneCooldown(30);
        Alert.alert('Invalid', data.message || 'Phone OTP is incorrect. Try again after 30 seconds');
      }
    } catch (err) {
      console.log('[DEBUG] OTP verification error:', err);
      setOtpPhoneVerified(false);
      setForm((p) => ({ ...p, otpPhone: '' }));
      setWrongOtpPhoneCooldown(30);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  // Verify email OTP using backend
  const handleVerifyEmailOtp = async () => {
    try {
      const res = await fetch('http://192.168.31.173:9090/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp: form.otpEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpEmailVerified(true);
        Alert.alert('Verified', 'Email OTP verified');
      } else {
        setOtpEmailVerified(false);
        setForm((p) => ({ ...p, otpEmail: '' }));
        setWrongOtpEmailCooldown(30);
        Alert.alert('Invalid', data.message || 'Email OTP is incorrect. Try again after 30 seconds');
      }
    } catch (err) {
      setOtpEmailVerified(false);
      setForm((p) => ({ ...p, otpEmail: '' }));
      setWrongOtpEmailCooldown(30);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  // Signup using backend (mobile signup)
  const handleSubmit = async () => {
    if (!otpPhoneVerified) {
      Alert.alert('Error', 'Please verify your phone OTP');
      return;
    }
    // Email OTP can be handled separately if required by backend
    try {
      const res = await mobileSignupUser({
        first: form.first,
        middle: form.middle,
        last: form.last,
        mobileNumber: form.phone,
      });
      if (res.success && res.data) {
        Alert.alert('Success', 'Account Created', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ]);
      } else {
        Alert.alert('Error', res.error || 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

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
            {/* Inputs unchanged */}
            <InputField label="First Name" required icon="person-outline" placeholder="Enter first name"
              value={form.first} onChangeText={(v) => handleChange('first', v)} error={errors.first} />

            <InputField label="Middle Name (optional)" icon="person-outline" placeholder="Enter middle name"
              value={form.middle} onChangeText={(v) => handleChange('middle', v)} error={errors.middle} />

            <InputField label="Last Name" required icon="person-outline" placeholder="Enter last name"
              value={form.last} onChangeText={(v) => handleChange('last', v)} error={errors.last} />

            <InputField
              label="Mobile Number"
              required
              icon="call-outline"
              showCountry
              countryCode="+91"
              placeholder="Enter mobile number"
              value={form.phone}
              onChangeText={(v) => handleChange('phone', v)}
              error={errors.phone}
              keyboardType="number-pad"
              rightButton={
                otpPhoneVerified
                  ? { label: '✔ Verified', disabled: true }
                  : {
                      label: 'Send OTP',
                      onPress: handleValidateOtpPhone,
                      disabled: !phoneValid,
                    }
              }
            />

            {otpVisiblePhone && (
              <>
                {console.log('[DEBUG] Rendering OtpInput for phone:', {
                  otpVisiblePhone,
                  value: form.otpPhone,
                  rightButton: {
                    label: otpPhoneVerified ? 'Verified' : 'Verify',
                    disabled: form.otpPhone.length !== 6 || otpPhoneVerified,
                  }
                })}
                <OtpInput
                  length={6}
                  value={form.otpPhone}
                  onChangeText={(v) => handleChange('otpPhone', v)}
                  rightButton={{
                    label: otpPhoneVerified ? 'Verified' : 'Verify',
                    onPress: handleVerifyPhoneOtp,
                    disabled: form.otpPhone.length !== 6 || otpPhoneVerified,
                  }}
                />

                {!otpPhoneVerified && (
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
              error={errors.email}
              keyboardType="email-address"
              rightButton={
                form.email ? (
                  otpEmailVerified
                    ? { label: '✔ Verified', disabled: true }
                    : {
                        label: 'Send OTP',
                        onPress: handleValidateOtpEmail,
                        disabled: !emailValid,
                      }
                ) : null
              }
            />

            {otpVisibleEmail && form.email && (
              <>
                <OtpInput
                  length={6}
                  value={form.otpEmail}
                  onChangeText={(v) => handleChange('otpEmail', v)}
                  rightButton={{
                    label: otpEmailVerified ? 'Verified' : 'Verify',
                    onPress: handleVerifyEmailOtp,
                    disabled: form.otpEmail.length !== 6 || otpEmailVerified,
                  }}
                />

                {!otpEmailVerified && (
                  <TouchableOpacity onPress={handleResendEmailOtp} disabled={timerEmail > 0}>
                    <Text style={signupStyles.resend}>
                      {timerEmail > 0 ? `Resend OTP in ${timerEmail}s` : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            <PrimaryButton
              title="Create Account"
              onPress={handleSubmit}
              disabled={!canSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

