import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HeaderGradient from '../components/HeaderGradient';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function SignupScreen({ navigation }) {
  const [otpVisible, setOtpVisible] = useState(false);

  const [form, setForm] = useState({
    first: '',
    middle: '',
    last: '',
    phone: '',
    email: '',
    otp: '',
  });

  const [errors, setErrors] = useState({});

  const onlyLetters = (v) => /^[A-Za-z]+$/.test(v);
  const lastNameRule = (v) => /^[A-Za-z]+( [A-Za-z]+)?$/.test(v);
  const validPhone = (v) => /^[6-9]\d{9}$/.test(v);
  const validEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  const validateField = (name, value) => {
    let msg = '';

    if (name === 'first') {
      if (!value) msg = 'Required';
      else if (!onlyLetters(value)) msg = 'Only letters';
    }

    if (name === 'middle') {
      if (value && !onlyLetters(value)) msg = 'Only letters';
    }

    if (name === 'last') {
      if (!value) msg = 'Required';
      else if (!lastNameRule(value)) msg = 'One space allowed (T R)';
    }

    if (name === 'phone') {
      if (!validPhone(value)) msg = 'Enter valid number';
    }

    if (name === 'email') {
      if (!validEmail(value)) msg = 'Enter valid email';
    }

    if (name === 'otp') {
      if (value.length !== 6) msg = 'Enter 6 digit OTP';
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (name, value) => {
    let clean = value;

    if (name === 'first' || name === 'middle') {
      clean = value.replace(/[^A-Za-z]/g, '');
    }

    if (name === 'last') {
      clean = value.replace(/[^A-Za-z ]/g, '');
      if ((clean.match(/ /g) || []).length > 1) return;
    }

    if (name === 'phone') {
      clean = value.replace(/\D/g, '').slice(0, 10);
    }

    setForm((prev) => {
      const updated = { ...prev, [name]: clean };
      validateField(name, clean);
      return updated;
    });
  };

  const formValid =
    form.first.trim() !== '' &&
    form.last.trim() !== '' &&
    validPhone(form.phone) &&
    validEmail(form.email) &&
    !errors.first &&
    !errors.last &&
    !errors.phone &&
    !errors.email;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            error={errors.phone}
          />

          <InputField
            label="Email"
            required
            icon="mail-outline"
            placeholder="Enter email"
            value={form.email}
            onChangeText={(v) => handleChange('email', v)}
            error={errors.email}
          />

          <PrimaryButton
            title="Validate OTP"
            disabled={!formValid}
            onPress={() => setOtpVisible(true)}
          />

          {otpVisible && (
            <View style={styles.otpBox}>
              <TextInput
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={form.otp}
                onChangeText={(v) => handleChange('otp', v)}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fb' },

  header: {
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 55,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 30,
  },

  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  subtitle: { color: '#fff', marginTop: 6 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -55,
    borderRadius: 28,
    padding: 22,
    elevation: 6,
  },

  otpBox: {
    borderWidth: 2,
    borderColor: '#6b0f1a',
    borderRadius: 22,
    height: 58,
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 12,
  },
});
