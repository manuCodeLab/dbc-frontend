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

export default function LoginScreen({ navigation }) {
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

  // Only Indian 10 digit numbers while typing
  const handlePhoneChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setPhone(cleaned);
  };

  // Send OTP (Dummy)
  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      Alert.alert(
        'Invalid Number',
        'Enter valid Indian mobile number (starts with 6-9)'
      );
      return;
    }

    Alert.alert('OTP Sent ✅', 'Your dummy OTP is: 123456');

    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    Alert.alert('OTP Resent ✅', 'Your dummy OTP is: 123456');
    setTimer(30);
    setCanResend(false);
  };

  const handleOtpChange = (val, index) => {
    const copy = [...otp];
    copy[index] = val;
    setOtp(copy);
    if (val && index < 5) inputs.current[index + 1].focus();
  };

  // 🔁 Reset OTP boxes on wrong OTP
  const resetOtpBoxes = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 100);
  };

  const handleLogin = () => {
    if (otp.join('') === '123456') {
      Alert.alert('Success 🎉', 'OTP Verified');
    } else {
      Alert.alert('Wrong OTP ❌', 'Enter 123456');
      resetOtpBoxes();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ flex: 1 }}>

            <HeaderGradient style={styles.header}>
              <View style={styles.iconWrap}>
                <Text style={styles.icon}>💼</Text>
              </View>
              <Text style={styles.appTitle}>Digital Business Card</Text>
              <Text style={styles.subtitle}>Grow your business digitally</Text>
            </HeaderGradient>

            <View style={styles.card}>
              <InputField
                placeholder="Enter mobile number"
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="number-pad"
                showCountry
                countryCode="+91"
                maxLength={10}
              />

              <PrimaryButton
                title="Send OTP"
                onPress={handleSendOtp}
                variant="primary"
              />

              {otpSent && (
                <>
                  <View style={styles.otpRow}>
                    {otp.map((d, i) => (
                      <TextInput
                        key={i}
                        ref={(r) => (inputs.current[i] = r)}
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={d}
                        onChangeText={(v) => {
                          const copy = [...otp];
                          copy[i] = v;
                          setOtp(copy);

                          // Move forward
                          if (v && i < 5) {
                            inputs.current[i + 1].focus();
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            if (otp[i] === '' && i > 0) {
                              inputs.current[i - 1].focus();
                            }
                            const copy = [...otp];
                            copy[i] = '';
                            setOtp(copy);
                          }
                        }}
                      />

                    ))}
                  </View>

                  <TouchableOpacity
                    onPress={handleResendOtp}
                    disabled={!canResend}
                    style={styles.resendWrap}
                  >
                    <Text style={styles.resendText}>
                      {canResend
                        ? 'Resend OTP'
                        : `Resend OTP in ${timer}s`}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <PrimaryButton
                title="Login"
                onPress={handleLogin}
                style={styles.loginBtn}
              />


              <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.newHereText}>New here?</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity
                style={styles.signupRow}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.createText}>Create your account </Text>
                <Text style={styles.signupText}>Sign Up →</Text>
              </TouchableOpacity>
            </View>

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
    height: 240,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  iconWrap: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 14,
    borderRadius: 40,
    marginBottom: 12,
  },
  icon: { fontSize: 28 },
  appTitle: { color: '#FFF', fontSize: 22, fontWeight: '700' },
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
    elevation: 3,
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
    color: COLORS.text,
  },
  resendWrap: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendText: {
    color: COLORS.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  newHereText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '500',
  },
  signupText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  loginBtn: {
  backgroundColor: '#5B0F1A',  // burgundy
  marginTop: 10,
},

});
