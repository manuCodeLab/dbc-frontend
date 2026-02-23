import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import InputField from '../../components/form/InputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS } from '../../styles/colors';
import { loginStyles } from '../../styles/screens/loginStyles';

import { loginUser, sendOtp } from '../../utils/api';

const { width } = Dimensions.get('window');



export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [wrongOtpCooldown, setWrongOtpCooldown] = useState(0);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (timer === 0) setCanResend(true);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  useEffect(() => {
    let cooldownInterval;
    if (wrongOtpCooldown > 0) {
      cooldownInterval = setInterval(() => setWrongOtpCooldown((t) => t - 1), 1000);
    }
    return () => clearInterval(cooldownInterval);
  }, [wrongOtpCooldown]);

  // Only Indian 10 digit numbers while typing
  const handlePhoneChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setPhone(cleaned);
  };


  // Send OTP using backend API
  const handleSendOtp = async () => {
    if (wrongOtpCooldown > 0) {
      Alert.alert('Please Wait', `You can send OTP again in ${wrongOtpCooldown} seconds`);
      return;
    }
    if (!/^[1-9]\d{9}$/.test(phone)) {
      Alert.alert('Invalid Number', 'Enter valid  mobile number (starts with 1-9)');
      return;
    }
    try {
      const res = await sendOtp(phone);
      if (res.success) {
        Alert.alert('OTP Sent ✅', 'OTP has been sent to your mobile number.');
        setOtpSent(true);
        setTimer(30);
        setCanResend(false);
        setWrongOtpCooldown(0);
      } else {
        Alert.alert('Error', res.error || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };


  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      const res = await sendOtp(phone);
      if (res.success) {
        Alert.alert('OTP Resent ✅', 'OTP has been resent to your mobile number.');
        setTimer(30);
        setCanResend(false);
      } else {
        Alert.alert('Error', res.error || 'Failed to resend OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  const handleOtpChange = (val, index) => {
    const copy = [...otp];
    copy[index] = val;
    setOtp(copy);
    if (val && index < 3) inputs.current[index + 1].focus();
  };

  // 🔁 Reset OTP boxes on wrong OTP
  const resetOtpBoxes = () => {
    setOtp(['', '', '', '']);
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 100);
  };


  // Login using backend API
  const handleLogin = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP');
      return;
    }
    try {
      console.log('[DEBUG] Login request:', { mobileNumber: phone, otp: enteredOtp });
      console.log('[DEBUG] curl command:', `curl -X POST 'http://192.168.31.173:9090/api/auth/login' -H 'Content-Type: application/json' -d '{"mobileNumber":"${phone}","otp":"${enteredOtp}"}'`);
      const res = await loginUser(phone, enteredOtp);
      console.log('[DEBUG] Login response:', res);
      if (res.success && res.data) {
        Alert.alert('Success 🎉', 'Login successful!');
        navigation.navigate('Landing');
      } else {
        resetOtpBoxes();
        setWrongOtpCooldown(30);
        Alert.alert('Login Failed', res.error || 'Invalid OTP or phone number');
      }
    } catch (err) {
      console.log('[DEBUG] Login error:', err);
      resetOtpBoxes();
      setWrongOtpCooldown(30);
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <SafeAreaView style={loginStyles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={loginStyles.container}>
          <View style={{ flex: 1 }}>

            <Header style={loginStyles.header}>
              <View style={loginStyles.iconWrap}>
                <Text style={loginStyles.icon}>💼</Text>
              </View>
              <Text style={loginStyles.appTitle}>Digital Business Card</Text>
              <Text style={loginStyles.subtitle}>Grow your business digitally</Text>
            </Header>

            <View style={loginStyles.card}>
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
                  <View style={loginStyles.otpRow}>
                    {otp.map((d, i) => (
                      <TextInput
                        key={i}
                        ref={(r) => (inputs.current[i] = r)}
                        style={loginStyles.otpBox}
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
                    style={loginStyles.resendWrap}
                  >
                    <Text style={loginStyles.resendText}>
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
                style={loginStyles.loginBtn}
              />


              <View style={loginStyles.dividerRow}>
                <View style={loginStyles.line} />
                <Text style={loginStyles.newHereText}>New here?</Text>
                <View style={loginStyles.line} />
              </View>

              <TouchableOpacity
                style={loginStyles.signupRow}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={loginStyles.createText}>Create your account </Text>
                <Text style={loginStyles.signupText}>Sign Up →</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
