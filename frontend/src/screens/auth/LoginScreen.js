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
import { loginStyles } from '../../styles/loginStyles';

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
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Wrong OTP ❌', 'Enter 123456');
      resetOtpBoxes();
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
