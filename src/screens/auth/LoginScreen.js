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
import { getUser, saveUser } from '../../utils/storage';

const { width } = Dimensions.get('window');

// Generate random OTP
const generateOTP = (length = 4) => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1)));
};

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
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

  // Send OTP (Random Generated)
  const handleSendOtp = () => {
    if (wrongOtpCooldown > 0) {
      Alert.alert('Please Wait', `You can send OTP again in ${wrongOtpCooldown} seconds`);
      return;
    }
    
    if (!/^[1-9]\d{9}$/.test(phone)) {
      Alert.alert(
        'Invalid Number',
        'Enter valid  mobile number (starts with 1-9)'
      );
      return;
    }

    const randomOtp = generateOTP().toString();
    setGeneratedOtp(randomOtp);
    Alert.alert('OTP Sent ✅', `Your OTP is: ${randomOtp}`);

    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
    setWrongOtpCooldown(0);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    const randomOtp = generateOTP().toString();
    setGeneratedOtp(randomOtp);
    Alert.alert('OTP Resent ✅', `Your OTP is: ${randomOtp}`);
    setTimer(30);
    setCanResend(false);
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

  const handleLogin = async () => {
    if (otp.join('') === generatedOtp) {
      try {
        // Verify user exists in storage
        const user = await getUser();
        if (!user) {
          Alert.alert('Error', 'User not found. Please sign up first.');
          resetOtpBoxes();
          return;
        }
        
        // Verify phone number matches
        if (user.phone !== phone) {
          Alert.alert('Error', 'Phone number does not match signup');
          resetOtpBoxes();
          return;
        }
        
        // Update login status and redirect to Landing page
        await saveUser({ ...user, isLoggedIn: true });
        Alert.alert('Success 🎉', 'OTP Verified');
        navigation.navigate('Landing');
      } catch (error) {
        Alert.alert('Error', 'Login failed');
        resetOtpBoxes();
      }
    } else {
      resetOtpBoxes();
      setWrongOtpCooldown(30);
      Alert.alert('Wrong OTP ❌', 'Entered OTP is incorrect. Try again after 30 seconds');
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
                          if (v && i < 3) {
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
