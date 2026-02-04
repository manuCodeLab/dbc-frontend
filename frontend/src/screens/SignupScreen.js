import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderGradient from '../components/HeaderGradient';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/colors';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (timer === 0) setCanResend(true);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handlePhoneChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setPhone(cleaned);
  };

  const handleSendOtp = () => {
    if (!firstName || !email) {
      Alert.alert('Fill all fields');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      Alert.alert('Invalid Indian mobile number');
      return;
    }

    Alert.alert('OTP Sent ✅', 'Dummy OTP is 123456');

    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    Alert.alert('OTP Resent ✅', 'Dummy OTP is 123456');
    setTimer(30);
    setCanResend(false);
  };

  const handleOtpChange = (val, index) => {
    const copy = [...otp];
    copy[index] = val;
    setOtp(copy);
    if (val && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1].focus();
      }
      const copy = [...otp];
      copy[index] = '';
      setOtp(copy);
    }
  };

  const handleCreateAccount = () => {
    if (otp.join('') === '123456') {
      Alert.alert('Account Created 🎉');
      navigation.navigate('Login');
    } else {
      Alert.alert('Wrong OTP ❌');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderGradient style={styles.header}>
            <Text style={styles.appTitle}>Create Account</Text>
          </HeaderGradient>

          <View style={styles.card}>
            <InputField placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <InputField placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

            <InputField
              placeholder="Mobile Number"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="number-pad"
              showCountry
              countryCode="+91"
              maxLength={10}
            />

            <PrimaryButton title="Send OTP" onPress={handleSendOtp} />

            {otpSent && (
              <>
                <View style={styles.otpRow}>
                  {otp.map((d, i) => (
                    <TextInput
                      key={i}
                      ref={(r) => (inputs.current[i] = r)}
                      style={styles.otpBox}
                      maxLength={1}
                      keyboardType="number-pad"
                      value={d}
                      onChangeText={(v) => handleOtpChange(v, i)}
                      onKeyPress={(e) => handleKeyPress(e, i)}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={!canResend}
                  style={styles.resendWrap}
                >
                  <Text style={styles.resendText}>
                    {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
                  </Text>
                </TouchableOpacity>

                <PrimaryButton title="Create Account" onPress={handleCreateAccount} />
              </>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Already have account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flexGrow: 1 },

  header: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appTitle: { color: '#FFF', fontSize: 22, fontWeight: '700' },

  card: {
    backgroundColor: COLORS.card,
    margin: 20,
    borderRadius: 16,
    padding: 18,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  otpBox: {
    width: width / 8,
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
  },

  resendWrap: { alignItems: 'center', marginTop: 10 },
  resendText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 18,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
