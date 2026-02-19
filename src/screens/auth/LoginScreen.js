// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   ScrollView,
// // // // //   KeyboardAvoidingView,
// // // // //   Platform,
// // // // //   TouchableOpacity,
// // // // //   TextInput,
// // // // //   Dimensions,
// // // // //   Alert,
// // // // // } from 'react-native';
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // import Header from '../../components/common/Header';
// // // // // import InputField from '../../components/form/InputField';
// // // // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // // // import { COLORS } from '../../styles/colors';
// // // // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // // import { loginUser, sendOtp } from '../../utils/api';

// // // // // const { width } = Dimensions.get('window');



// // // // // export default function LoginScreen({ navigation }) {
// // // // //   const [phone, setPhone] = useState('');
// // // // //   const [otpSent, setOtpSent] = useState(false);
// // // // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // //   const [timer, setTimer] = useState(30);
// // // // //   const [canResend, setCanResend] = useState(false);
// // // // //   const [wrongOtpCooldown, setWrongOtpCooldown] = useState(0);
// // // // //   const inputs = useRef([]);

// // // // //   useEffect(() => {
// // // // //     let interval;
// // // // //     if (otpSent && timer > 0) {
// // // // //       interval = setInterval(() => setTimer((t) => t - 1), 1000);
// // // // //     }
// // // // //     if (timer === 0) setCanResend(true);
// // // // //     return () => clearInterval(interval);
// // // // //   }, [otpSent, timer]);

// // // // //   useEffect(() => {
// // // // //     let cooldownInterval;
// // // // //     if (wrongOtpCooldown > 0) {
// // // // //       cooldownInterval = setInterval(() => setWrongOtpCooldown((t) => t - 1), 1000);
// // // // //     }
// // // // //     return () => clearInterval(cooldownInterval);
// // // // //   }, [wrongOtpCooldown]);

// // // // //   // Only Indian 10 digit numbers while typing
// // // // //   const handlePhoneChange = (text) => {
// // // // //     let cleaned = text.replace(/\D/g, '');
// // // // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // // // //     setPhone(cleaned);
// // // // //   };


// // // // //   // Send OTP using backend API
// // // // //   const handleSendOtp = async () => {
// // // // //     if (wrongOtpCooldown > 0) {
// // // // //       Alert.alert('Please Wait', `You can send OTP again in ${wrongOtpCooldown} seconds`);
// // // // //       return;
// // // // //     }
// // // // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // // // //       Alert.alert('Invalid Number', 'Enter valid  mobile number (starts with 1-9)');
// // // // //       return;
// // // // //     }
// // // // //     try {
// // // // //       const res = await sendOtp(phone);
// // // // //       if (res.success) {
// // // // //         Alert.alert('OTP Sent ✅', 'OTP has been sent to your mobile number.');
// // // // //         setOtpSent(true);
// // // // //         setTimer(30);
// // // // //         setCanResend(false);
// // // // //         setWrongOtpCooldown(0);
// // // // //       } else {
// // // // //         Alert.alert('Error', res.error || 'Failed to send OTP');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', 'Failed to send OTP');
// // // // //     }
// // // // //   };


// // // // //   const handleResendOtp = async () => {
// // // // //     if (!canResend) return;
// // // // //     try {
// // // // //       const res = await sendOtp(phone);
// // // // //       if (res.success) {
// // // // //         Alert.alert('OTP Resent ✅', 'OTP has been resent to your mobile number.');
// // // // //         setTimer(30);
// // // // //         setCanResend(false);
// // // // //       } else {
// // // // //         Alert.alert('Error', res.error || 'Failed to resend OTP');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', 'Failed to resend OTP');
// // // // //     }
// // // // //   };

// // // // //   const handleOtpChange = (val, index) => {
// // // // //     const copy = [...otp];
// // // // //     copy[index] = val;
// // // // //     setOtp(copy);
// // // // //     if (val && index < 3) inputs.current[index + 1].focus();
// // // // //   };

// // // // //   // 🔁 Reset OTP boxes on wrong OTP
// // // // //   const resetOtpBoxes = () => {
// // // // //     setOtp(['', '', '', '']);
// // // // //     setTimeout(() => {
// // // // //       inputs.current[0]?.focus();
// // // // //     }, 100);
// // // // //   };


// // // // //   // Login using backend API
// // // // //   const handleLogin = async () => {
// // // // //     const enteredOtp = otp.join('');
// // // // //     if (enteredOtp.length !== 6) {
// // // // //       Alert.alert('Error', 'Please enter the 6-digit OTP');
// // // // //       return;
// // // // //     }
// // // // //     try {
// // // // //       console.log('[DEBUG] Login request:', { mobileNumber: phone, otp: enteredOtp });
// // // // //       console.log('[DEBUG] curl command:', `curl -X POST 'http://192.168.31.173:9090/api/auth/login' -H 'Content-Type: application/json' -d '{"mobileNumber":"${phone}","otp":"${enteredOtp}"}'`);
// // // // //       const res = await loginUser(phone, enteredOtp);
// // // // //       console.log('[DEBUG] Login response:', res);
// // // // //       if (res.success && res.data) {
// // // // //         Alert.alert('Success 🎉', 'Login successful!');
// // // // //         navigation.navigate('Landing');
// // // // //       } else {
// // // // //         resetOtpBoxes();
// // // // //         setWrongOtpCooldown(30);
// // // // //         Alert.alert('Login Failed', res.error || 'Invalid OTP or phone number');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.log('[DEBUG] Login error:', err);
// // // // //       resetOtpBoxes();
// // // // //       setWrongOtpCooldown(30);
// // // // //       Alert.alert('Error', 'Login failed');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <SafeAreaView style={loginStyles.safe}>
// // // // //       <KeyboardAvoidingView
// // // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // //         style={{ flex: 1 }}
// // // // //       >
// // // // //         <ScrollView contentContainerStyle={loginStyles.container}>
// // // // //           <View style={{ flex: 1 }}>

// // // // //             <Header style={loginStyles.header}>
// // // // //               <View style={loginStyles.iconWrap}>
// // // // //                 <Text style={loginStyles.icon}>💼</Text>
// // // // //               </View>
// // // // //               <Text style={loginStyles.appTitle}>Digital Business Card</Text>
// // // // //               <Text style={loginStyles.subtitle}>Grow your business digitally</Text>
// // // // //             </Header>

// // // // //             <View style={loginStyles.card}>
// // // // //               <InputField
// // // // //                 placeholder="Enter mobile number"
// // // // //                 value={phone}
// // // // //                 onChangeText={handlePhoneChange}
// // // // //                 keyboardType="number-pad"
// // // // //                 showCountry
// // // // //                 countryCode="+91"
// // // // //                 maxLength={10}
// // // // //               />

// // // // //               <PrimaryButton
// // // // //                 title="Send OTP"
// // // // //                 onPress={handleSendOtp}
// // // // //                 variant="primary"
// // // // //               />

// // // // //               {otpSent && (
// // // // //                 <>
// // // // //                   <View style={loginStyles.otpRow}>
// // // // //                     {otp.map((d, i) => (
// // // // //                       <TextInput
// // // // //                         key={i}
// // // // //                         ref={(r) => (inputs.current[i] = r)}
// // // // //                         style={loginStyles.otpBox}
// // // // //                         keyboardType="number-pad"
// // // // //                         maxLength={1}
// // // // //                         value={d}
// // // // //                         onChangeText={(v) => {
// // // // //                           const copy = [...otp];
// // // // //                           copy[i] = v;
// // // // //                           setOtp(copy);

// // // // //                           // Move forward
// // // // //                           if (v && i < 5) {
// // // // //                             inputs.current[i + 1].focus();
// // // // //                           }
// // // // //                         }}
// // // // //                         onKeyPress={({ nativeEvent }) => {
// // // // //                           if (nativeEvent.key === 'Backspace') {
// // // // //                             if (otp[i] === '' && i > 0) {
// // // // //                               inputs.current[i - 1].focus();
// // // // //                             }
// // // // //                             const copy = [...otp];
// // // // //                             copy[i] = '';
// // // // //                             setOtp(copy);
// // // // //                           }
// // // // //                         }}
// // // // //                       />
// // // // //                     ))}
// // // // //                   </View>

// // // // //                   <TouchableOpacity
// // // // //                     onPress={handleResendOtp}
// // // // //                     disabled={!canResend}
// // // // //                     style={loginStyles.resendWrap}
// // // // //                   >
// // // // //                     <Text style={loginStyles.resendText}>
// // // // //                       {canResend
// // // // //                         ? 'Resend OTP'
// // // // //                         : `Resend OTP in ${timer}s`}
// // // // //                     </Text>
// // // // //                   </TouchableOpacity>
// // // // //                 </>
// // // // //               )}
// // // // //               <PrimaryButton
// // // // //                 title="Login"
// // // // //                 onPress={handleLogin}
// // // // //                 style={loginStyles.loginBtn}
// // // // //               />


// // // // //               <View style={loginStyles.dividerRow}>
// // // // //                 <View style={loginStyles.line} />
// // // // //                 <Text style={loginStyles.newHereText}>New here?</Text>
// // // // //                 <View style={loginStyles.line} />
// // // // //               </View>

// // // // //               <TouchableOpacity
// // // // //                 style={loginStyles.signupRow}
// // // // //                 onPress={() => navigation.navigate('Signup')}
// // // // //               >
// // // // //                 <Text style={loginStyles.createText}>Create your account </Text>
// // // // //                 <Text style={loginStyles.signupText}>Sign Up →</Text>
// // // // //               </TouchableOpacity>
// // // // //             </View>

// // // // //           </View>
// // // // //         </ScrollView>
// // // // //       </KeyboardAvoidingView>
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // }


// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   ScrollView,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // //   TouchableOpacity,
// // // //   TextInput,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // import Header from '../../components/common/Header';
// // // // import InputField from '../../components/form/InputField';
// // // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // // ⭐ YOUR BACKEND IP
// // // // const BASE_URL = 'http://10.89.127.72:9090';

// // // // export default function LoginScreen({ navigation }) {

// // // //   const [phone, setPhone] = useState('');
// // // //   const [otpSent, setOtpSent] = useState(false);
// // // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // // //   const [timer, setTimer] = useState(30);
// // // //   const [canResend, setCanResend] = useState(false);

// // // //   const inputs = useRef([]);

// // // //   // ⏱️ Timer
// // // //   useEffect(() => {
// // // //     let interval;
// // // //     if (otpSent && timer > 0) {
// // // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // // //     }
// // // //     if (timer === 0) setCanResend(true);
// // // //     return () => clearInterval(interval);
// // // //   }, [otpSent, timer]);

// // // //   // 📱 Phone input validation
// // // //   const handlePhoneChange = (text) => {
// // // //     let cleaned = text.replace(/\D/g, '');
// // // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // // //     setPhone(cleaned);
// // // //   };

// // // //   // =========================
// // // //   // SEND OTP (LOGIN)
// // // //   // =========================
// // // //   const handleSendOtp = async () => {

// // // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',   // ⭐ SESSION SUPPORT
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Sent ✅', data.message || 'OTP sent');
// // // //         setOtpSent(true);
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to send OTP');
// // // //       }
// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // RESEND OTP
// // // //   // =========================
// // // //   const handleResendOtp = async () => {

// // // //     if (!canResend) return;

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Resent ✅');
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed');
// // // //       }
// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // VERIFY OTP → LOGIN
// // // //   // =========================
// // // //   const handleLogin = async () => {

// // // //     const enteredOtp = otp.join('');

// // // //     if (enteredOtp.length !== 6) {
// // // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',   // ⭐ SESSION COOKIE STORED
// // // //         body: JSON.stringify({
// // // //           mobileNumber: phone,
// // // //           otp: enteredOtp,
// // // //         }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {

// // // //         Alert.alert('Success 🎉', 'Login successful!');

// // // //         // ✅ Session is active now
// // // //         navigation.navigate('Landing');

// // // //       } else {
// // // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Login failed');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // OTP INPUT HANDLING
// // // //   // =========================
// // // //   const handleOtpChange = (value, index) => {

// // // //     const copy = [...otp];
// // // //     copy[index] = value;
// // // //     setOtp(copy);

// // // //     if (value && index < 5) {
// // // //       inputs.current[index + 1].focus();
// // // //     }
// // // //   };

// // // //   return (
// // // //     <SafeAreaView style={loginStyles.safe}>
// // // //       <KeyboardAvoidingView
// // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //         style={{ flex: 1 }}
// // // //       >

// // // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // // //           <Header style={loginStyles.header}>
// // // //             <Text style={loginStyles.appTitle}>Digital Business Card</Text>
// // // //             <Text style={loginStyles.subtitle}>
// // // //               Grow your business digitally
// // // //             </Text>
// // // //           </Header>

// // // //           <View style={loginStyles.card}>

// // // //             <InputField
// // // //               placeholder="Enter mobile number"
// // // //               value={phone}
// // // //               onChangeText={handlePhoneChange}
// // // //               keyboardType="number-pad"
// // // //               showCountry
// // // //               countryCode="+91"
// // // //               maxLength={10}
// // // //             />

// // // //             <PrimaryButton
// // // //               title="Send OTP"
// // // //               onPress={handleSendOtp}
// // // //             />

// // // //             {otpSent && (
// // // //               <>
// // // //                 <View style={loginStyles.otpRow}>
// // // //                   {otp.map((digit, i) => (
// // // //                     <TextInput
// // // //                       key={i}
// // // //                       ref={(r) => inputs.current[i] = r}
// // // //                       style={loginStyles.otpBox}
// // // //                       keyboardType="number-pad"
// // // //                       maxLength={1}
// // // //                       value={digit}
// // // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // // //                     />
// // // //                   ))}
// // // //                 </View>

// // // //                 <TouchableOpacity
// // // //                   onPress={handleResendOtp}
// // // //                   disabled={!canResend}
// // // //                   style={loginStyles.resendWrap}
// // // //                 >
// // // //                   <Text style={loginStyles.resendText}>
// // // //                     {canResend
// // // //                       ? 'Resend OTP'
// // // //                       : `Resend OTP in ${timer}s`}
// // // //                   </Text>
// // // //                 </TouchableOpacity>
// // // //               </>
// // // //             )}

// // // //             <PrimaryButton
// // // //               title="Login"
// // // //               onPress={handleLogin}
// // // //               style={loginStyles.loginBtn}
// // // //             />

// // // //           </View>

// // // //         </ScrollView>

// // // //       </KeyboardAvoidingView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }


// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   ScrollView,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // //   TouchableOpacity,
// // // //   TextInput,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // import Header from '../../components/common/Header';
// // // // import InputField from '../../components/form/InputField';
// // // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // // ⭐ YOUR BACKEND IP
// // // // const BASE_URL = 'http://10.89.127.72:9090';

// // // // export default function LoginScreen({ navigation }) {

// // // //   const [phone, setPhone] = useState('');
// // // //   const [otpSent, setOtpSent] = useState(false);
// // // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // // //   const [timer, setTimer] = useState(30);
// // // //   const [canResend, setCanResend] = useState(false);

// // // //   const inputs = useRef([]);

// // // //   // =========================
// // // //   // TIMER
// // // //   // =========================
// // // //   useEffect(() => {
// // // //     let interval;

// // // //     if (otpSent && timer > 0) {
// // // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // // //     }

// // // //     if (timer === 0) setCanResend(true);

// // // //     return () => clearInterval(interval);
// // // //   }, [otpSent, timer]);

// // // //   // =========================
// // // //   // PHONE INPUT
// // // //   // =========================
// // // //   const handlePhoneChange = (text) => {
// // // //     let cleaned = text.replace(/\D/g, '');
// // // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // // //     setPhone(cleaned);
// // // //   };

// // // //   // =========================
// // // //   // SEND OTP
// // // //   // =========================
// // // //   const handleSendOtp = async () => {

// // // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Sent ✅', data.message || 'OTP sent');
// // // //         setOtpSent(true);
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to send OTP');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // RESEND OTP
// // // //   // =========================
// // // //   const handleResendOtp = async () => {

// // // //     if (!canResend) return;

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Resent ✅');
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // VERIFY OTP → LOGIN
// // // //   // =========================
// // // //   const handleLogin = async () => {

// // // //     const enteredOtp = otp.join('');

// // // //     if (enteredOtp.length !== 6) {
// // // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({
// // // //           mobileNumber: phone,
// // // //           otp: enteredOtp,
// // // //         }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('Success 🎉', 'Login successful!');
// // // //         navigation.navigate('Landing');
// // // //       } else {
// // // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Login failed');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // OTP INPUT HANDLING
// // // //   // =========================
// // // //   const handleOtpChange = (value, index) => {

// // // //     const copy = [...otp];
// // // //     copy[index] = value;
// // // //     setOtp(copy);

// // // //     if (value && index < 5) {
// // // //       inputs.current[index + 1].focus();
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // UI
// // // //   // =========================
// // // //   return (
// // // //     <SafeAreaView style={loginStyles.safe}>
// // // //       <KeyboardAvoidingView
// // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //         style={{ flex: 1 }}
// // // //       >

// // // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // // //           <Header style={loginStyles.header}>
// // // //             <Text style={loginStyles.appTitle}>
// // // //               Digital Business Card
// // // //             </Text>
// // // //             <Text style={loginStyles.subtitle}>
// // // //               Grow your business digitally
// // // //             </Text>
// // // //           </Header>

// // // //           <View style={loginStyles.card}>

// // // //             {/* PHONE INPUT */}
// // // //             <InputField
// // // //               placeholder="Enter mobile number"
// // // //               value={phone}
// // // //               onChangeText={handlePhoneChange}
// // // //               keyboardType="number-pad"
// // // //               showCountry
// // // //               countryCode="+91"
// // // //               maxLength={10}
// // // //             />

// // // //             {/* SEND OTP */}
// // // //             <PrimaryButton
// // // //               title="Send OTP"
// // // //               onPress={handleSendOtp}
// // // //             />

// // // //             {/* OTP BOXES */}
// // // //             {otpSent && (
// // // //               <>
// // // //                 <View style={loginStyles.otpRow}>
// // // //                   {otp.map((digit, i) => (
// // // //                     <TextInput
// // // //                       key={i}
// // // //                       ref={(r) => inputs.current[i] = r}
// // // //                       style={loginStyles.otpBox}
// // // //                       keyboardType="number-pad"
// // // //                       maxLength={1}
// // // //                       value={digit}
// // // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // // //                     />
// // // //                   ))}
// // // //                 </View>

// // // //                 {/* RESEND */}
// // // //                 <TouchableOpacity
// // // //                   onPress={handleResendOtp}
// // // //                   disabled={!canResend}
// // // //                   style={loginStyles.resendWrap}
// // // //                 >
// // // //                   <Text style={loginStyles.resendText}>
// // // //                     {canResend
// // // //                       ? 'Resend OTP'
// // // //                       : `Resend OTP in ${timer}s`}
// // // //                   </Text>
// // // //                 </TouchableOpacity>
// // // //               </>
// // // //             )}

// // // //             {/* LOGIN BUTTON */}
// // // //             <PrimaryButton
// // // //               title="Login"
// // // //               onPress={handleLogin}
// // // //               style={loginStyles.loginBtn}
// // // //             />

// // // //             {/* SIGNUP LINK */}
// // // //             <View style={loginStyles.dividerRow}>
// // // //               <View style={loginStyles.line} />
// // // //               <Text style={loginStyles.newHereText}>
// // // //                 New here?
// // // //               </Text>
// // // //               <View style={loginStyles.line} />
// // // //             </View>

// // // //             <TouchableOpacity
// // // //               style={loginStyles.signupRow}
// // // //               onPress={() => navigation.navigate('Signup')}
// // // //             >
// // // //               <Text style={loginStyles.createText}>
// // // //                 Create your account
// // // //               </Text>

// // // //               <Text style={loginStyles.signupText}>
// // // //                 Sign Up →
// // // //               </Text>
// // // //             </TouchableOpacity>

// // // //           </View>

// // // //         </ScrollView>

// // // //       </KeyboardAvoidingView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }


// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   ScrollView,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // //   TouchableOpacity,
// // // //   TextInput,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // import Header from '../../components/common/Header';
// // // // import InputField from '../../components/form/InputField';
// // // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // import CookieManager from '@react-native-cookies/cookies';

// // // // // ⭐ YOUR BACKEND IP
// // // // const BASE_URL = 'http://10.89.127.72:9090';

// // // // export default function LoginScreen({ navigation }) {

// // // //   const [phone, setPhone] = useState('');
// // // //   const [otpSent, setOtpSent] = useState(false);
// // // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // // //   const [timer, setTimer] = useState(30);
// // // //   const [canResend, setCanResend] = useState(false);

// // // //   const inputs = useRef([]);

// // // //   // =========================
// // // //   // TIMER
// // // //   // =========================
// // // //   useEffect(() => {
// // // //     let interval;

// // // //     if (otpSent && timer > 0) {
// // // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // // //     }

// // // //     if (timer === 0) setCanResend(true);

// // // //     return () => clearInterval(interval);
// // // //   }, [otpSent, timer]);

// // // //   // =========================
// // // //   // PHONE INPUT
// // // //   // =========================
// // // //   const handlePhoneChange = (text) => {
// // // //     let cleaned = text.replace(/\D/g, '');
// // // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // // //     setPhone(cleaned);
// // // //   };

// // // //   // =========================
// // // //   // SEND OTP
// // // //   // =========================
// // // //   const handleSendOtp = async () => {

// // // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include', // ⭐ IMPORTANT
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Sent ✅', data.message || 'OTP sent');
// // // //         setOtpSent(true);
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to send OTP');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // RESEND OTP
// // // //   // =========================
// // // //   const handleResendOtp = async () => {

// // // //     if (!canResend) return;

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({ mobileNumber: phone }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {
// // // //         Alert.alert('OTP Resent ✅');
// // // //         setTimer(30);
// // // //         setCanResend(false);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Network error');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // VERIFY OTP → LOGIN
// // // //   // =========================
// // // //   const handleLogin = async () => {

// // // //     const enteredOtp = otp.join('');

// // // //     if (enteredOtp.length !== 6) {
// // // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',  // ⭐ SESSION COOKIE RECEIVED
// // // //         body: JSON.stringify({
// // // //           mobileNumber: phone,
// // // //           otp: enteredOtp,
// // // //         }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (res.ok && data.status === 1) {

// // // //         // ⭐ SAVE SESSION COOKIE
// // // //         const cookies = await CookieManager.get(BASE_URL);
// // // //         console.log('Session cookies:', cookies);

// // // //         Alert.alert('Success 🎉', 'Login successful!');

// // // //         navigation.replace('Landing');

// // // //       } else {
// // // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // // //       }

// // // //     } catch {
// // // //       Alert.alert('Error', 'Login failed');
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // OTP INPUT HANDLING
// // // //   // =========================
// // // //   const handleOtpChange = (value, index) => {

// // // //     const copy = [...otp];
// // // //     copy[index] = value;
// // // //     setOtp(copy);

// // // //     if (value && index < 5) {
// // // //       inputs.current[index + 1].focus();
// // // //     }
// // // //   };

// // // //   // =========================
// // // //   // UI
// // // //   // =========================
// // // //   return (
// // // //     <SafeAreaView style={loginStyles.safe}>
// // // //       <KeyboardAvoidingView
// // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //         style={{ flex: 1 }}
// // // //       >

// // // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // // //           <Header style={loginStyles.header}>
// // // //             <Text style={loginStyles.appTitle}>
// // // //               Digital Business Card
// // // //             </Text>
// // // //             <Text style={loginStyles.subtitle}>
// // // //               Grow your business digitally
// // // //             </Text>
// // // //           </Header>

// // // //           <View style={loginStyles.card}>

// // // //             <InputField
// // // //               placeholder="Enter mobile number"
// // // //               value={phone}
// // // //               onChangeText={handlePhoneChange}
// // // //               keyboardType="number-pad"
// // // //               showCountry
// // // //               countryCode="+91"
// // // //               maxLength={10}
// // // //             />

// // // //             <PrimaryButton
// // // //               title="Send OTP"
// // // //               onPress={handleSendOtp}
// // // //             />

// // // //             {otpSent && (
// // // //               <>
// // // //                 <View style={loginStyles.otpRow}>
// // // //                   {otp.map((digit, i) => (
// // // //                     <TextInput
// // // //                       key={i}
// // // //                       ref={(r) => inputs.current[i] = r}
// // // //                       style={loginStyles.otpBox}
// // // //                       keyboardType="number-pad"
// // // //                       maxLength={1}
// // // //                       value={digit}
// // // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // // //                     />
// // // //                   ))}
// // // //                 </View>

// // // //                 <TouchableOpacity
// // // //                   onPress={handleResendOtp}
// // // //                   disabled={!canResend}
// // // //                   style={loginStyles.resendWrap}
// // // //                 >
// // // //                   <Text style={loginStyles.resendText}>
// // // //                     {canResend
// // // //                       ? 'Resend OTP'
// // // //                       : `Resend OTP in ${timer}s`}
// // // //                   </Text>
// // // //                 </TouchableOpacity>
// // // //               </>
// // // //             )}

// // // //             <PrimaryButton
// // // //               title="Login"
// // // //               onPress={handleLogin}
// // // //               style={loginStyles.loginBtn}
// // // //             />

// // // //             {/* SIGNUP LINK */}
// // // //             <TouchableOpacity
// // // //               style={loginStyles.signupRow}
// // // //               onPress={() => navigation.navigate('Signup')}
// // // //             >
// // // //               <Text>Create your account →</Text>
// // // //             </TouchableOpacity>

// // // //           </View>

// // // //         </ScrollView>

// // // //       </KeyboardAvoidingView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   TouchableOpacity,
// // //   TextInput,
// // //   Alert,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // import Header from '../../components/common/Header';
// // // import InputField from '../../components/form/InputField';
// // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // ⭐ YOUR BACKEND IP
// // // const BASE_URL = 'http://10.89.127.72:9090';

// // // export default function LoginScreen({ navigation }) {

// // //   const [phone, setPhone] = useState('');
// // //   const [otpSent, setOtpSent] = useState(false);
// // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // //   const [timer, setTimer] = useState(30);
// // //   const [canResend, setCanResend] = useState(false);

// // //   const inputs = useRef([]);

// // //   // =========================
// // //   // TIMER
// // //   // =========================
// // //   useEffect(() => {
// // //     let interval;

// // //     if (otpSent && timer > 0) {
// // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // //     }

// // //     if (timer === 0) setCanResend(true);

// // //     return () => clearInterval(interval);
// // //   }, [otpSent, timer]);

// // //   // =========================
// // //   // PHONE INPUT
// // //   // =========================
// // //   const handlePhoneChange = (text) => {
// // //     const cleaned = text.replace(/\D/g, '').slice(0, 10);
// // //     setPhone(cleaned);
// // //   };

// // //   // =========================
// // //   // SEND OTP
// // //   // =========================
// // //   const handleSendOtp = async () => {

// // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         Alert.alert('OTP Sent ✅');
// // //         setOtpSent(true);
// // //         setTimer(30);
// // //         setCanResend(false);
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to send OTP');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // =========================
// // //   // RESEND OTP
// // //   // =========================
// // //   const handleResendOtp = async () => {

// // //     if (!canResend) return;

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         Alert.alert('OTP Resent');
// // //         setTimer(30);
// // //         setCanResend(false);
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // =========================
// // //   // VERIFY OTP → LOGIN
// // //   // =========================
// // //   const handleLogin = async () => {

// // //     const enteredOtp = otp.join('');

// // //     if (enteredOtp.length !== 6) {
// // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',   // ⭐ REQUIRED FOR SESSION
// // //         body: JSON.stringify({
// // //           mobileNumber: phone,
// // //           otp: enteredOtp,
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         Alert.alert('Success 🎉', 'Login successful!');
// // //         navigation.replace('Landing');
// // //       } else {
// // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Login failed');
// // //     }
// // //   };

// // //   // =========================
// // //   // OTP INPUT HANDLING
// // //   // =========================
// // //   const handleOtpChange = (value, index) => {

// // //     const copy = [...otp];
// // //     copy[index] = value;
// // //     setOtp(copy);

// // //     if (value && index < 5) {
// // //       inputs.current[index + 1].focus();
// // //     }
// // //   };

// // //   // =========================
// // //   // UI
// // //   // =========================
// // //   return (
// // //     <SafeAreaView style={loginStyles.safe}>
// // //       <KeyboardAvoidingView
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //         style={{ flex: 1 }}
// // //       >

// // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // //           <Header style={loginStyles.header}>
// // //             <Text style={loginStyles.appTitle}>
// // //               Digital Business Card
// // //             </Text>
// // //             <Text style={loginStyles.subtitle}>
// // //               Grow your business digitally
// // //             </Text>
// // //           </Header>

// // //           <View style={loginStyles.card}>

// // //             <InputField
// // //               placeholder="Enter mobile number"
// // //               value={phone}
// // //               onChangeText={handlePhoneChange}
// // //               keyboardType="number-pad"
// // //               maxLength={10}
// // //             />

// // //             <PrimaryButton
// // //               title="Send OTP"
// // //               onPress={handleSendOtp}
// // //             />

// // //             {otpSent && (
// // //               <>
// // //                 <View style={loginStyles.otpRow}>
// // //                   {otp.map((digit, i) => (
// // //                     <TextInput
// // //                       key={i}
// // //                       ref={(r) => inputs.current[i] = r}
// // //                       style={loginStyles.otpBox}
// // //                       keyboardType="number-pad"
// // //                       maxLength={1}
// // //                       value={digit}
// // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // //                     />
// // //                   ))}
// // //                 </View>

// // //                 <TouchableOpacity
// // //                   onPress={handleResendOtp}
// // //                   disabled={!canResend}
// // //                   style={loginStyles.resendWrap}
// // //                 >
// // //                   <Text style={loginStyles.resendText}>
// // //                     {canResend
// // //                       ? 'Resend OTP'
// // //                       : `Resend OTP in ${timer}s`}
// // //                   </Text>
// // //                 </TouchableOpacity>

// // //                 <PrimaryButton
// // //                   title="Login"
// // //                   onPress={handleLogin}
// // //                   style={loginStyles.loginBtn}
// // //                 />
// // //               </>
// // //             )}

// // //             {/* SIGNUP LINK */}
// // //             <TouchableOpacity
// // //               style={loginStyles.signupRow}
// // //               onPress={() => navigation.navigate('Signup')}
// // //             >
// // //               <Text>Create your account →</Text>
// // //             </TouchableOpacity>

// // //           </View>

// // //         </ScrollView>

// // //       </KeyboardAvoidingView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   TouchableOpacity,
// // //   TextInput,
// // //   Alert,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // import Header from '../../components/common/Header';
// // // import InputField from '../../components/form/InputField';
// // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // ⭐ BACKEND
// // // const BASE_URL = 'http://10.89.127.72:9090';

// // // export default function LoginScreen({ navigation }) {

// // //   const [phone, setPhone] = useState('');
// // //   const [otpSent, setOtpSent] = useState(false);
// // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // //   const [timer, setTimer] = useState(30);
// // //   const [canResend, setCanResend] = useState(false);

// // //   const inputs = useRef([]);

// // //   // TIMER
// // //   useEffect(() => {
// // //     let interval;

// // //     if (otpSent && timer > 0) {
// // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // //     }

// // //     if (timer === 0) setCanResend(true);

// // //     return () => clearInterval(interval);
// // //   }, [otpSent, timer]);

// // //   // PHONE INPUT
// // //   const handlePhoneChange = (text) => {
// // //     let cleaned = text.replace(/\D/g, '');
// // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // //     setPhone(cleaned);
// // //   };

// // //   // SEND OTP
// // //   const handleSendOtp = async () => {

// // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',   // ⭐ SESSION
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         setOtpSent(true);
// // //         setTimer(30);
// // //         setCanResend(false);
// // //         Alert.alert('OTP Sent', 'Check your mobile');
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // RESEND OTP
// // //   const handleResendOtp = async () => {

// // //     if (!canResend) return;

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         setTimer(30);
// // //         setCanResend(false);
// // //         Alert.alert('OTP Resent');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // LOGIN
// // //   const handleLogin = async () => {

// // //     const enteredOtp = otp.join('');

// // //     if (enteredOtp.length !== 6) {
// // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',
// // //         body: JSON.stringify({
// // //           mobileNumber: phone,
// // //           otp: enteredOtp,
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         Alert.alert('Success', 'Login successful');
// // //         navigation.replace('Landing');
// // //       } else {
// // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Login failed');
// // //     }
// // //   };

// // //   const handleOtpChange = (value, index) => {
// // //     const copy = [...otp];
// // //     copy[index] = value;
// // //     setOtp(copy);

// // //     if (value && index < 5) {
// // //       inputs.current[index + 1].focus();
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={loginStyles.safe}>
// // //       <KeyboardAvoidingView
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //         style={{ flex: 1 }}
// // //       >

// // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // //           <Header style={loginStyles.header}>
// // //             <Text style={loginStyles.appTitle}>
// // //               Digital Business Card
// // //             </Text>
// // //             <Text style={loginStyles.subtitle}>
// // //               Grow your business digitally
// // //             </Text>
// // //           </Header>

// // //           <View style={loginStyles.card}>

// // //             <InputField
// // //               placeholder="Enter mobile number"
// // //               value={phone}
// // //               onChangeText={handlePhoneChange}
// // //               keyboardType="number-pad"
// // //               showCountry
// // //               countryCode="+91"
// // //               maxLength={10}
// // //             />

// // //             <PrimaryButton
// // //               title="Send OTP"
// // //               onPress={handleSendOtp}
// // //             />

// // //             {otpSent && (
// // //               <>
// // //                 <View style={loginStyles.otpRow}>
// // //                   {otp.map((digit, i) => (
// // //                     <TextInput
// // //                       key={i}
// // //                       ref={(r) => inputs.current[i] = r}
// // //                       style={loginStyles.otpBox}
// // //                       keyboardType="number-pad"
// // //                       maxLength={1}
// // //                       value={digit}
// // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // //                     />
// // //                   ))}
// // //                 </View>

// // //                 <TouchableOpacity
// // //                   onPress={handleResendOtp}
// // //                   disabled={!canResend}
// // //                   style={loginStyles.resendWrap}
// // //                 >
// // //                   <Text style={loginStyles.resendText}>
// // //                     {canResend
// // //                       ? 'Resend OTP'
// // //                       : `Resend OTP in ${timer}s`}
// // //                   </Text>
// // //                 </TouchableOpacity>
// // //               </>
// // //             )}

// // //             <PrimaryButton
// // //               title="Login"
// // //               onPress={handleLogin}
// // //               style={loginStyles.loginBtn}
// // //             />

// // //             {/* SIGNUP LINK */}
// // //             <View style={loginStyles.dividerRow}>
// // //               <View style={loginStyles.line} />
// // //               <Text style={loginStyles.newHereText}>
// // //                 New here?
// // //               </Text>
// // //               <View style={loginStyles.line} />
// // //             </View>

// // //             <TouchableOpacity
// // //               style={loginStyles.signupRow}
// // //               onPress={() => navigation.navigate('Signup')}
// // //             >
// // //               <Text style={loginStyles.createText}>
// // //                 Create your account
// // //               </Text>

// // //               <Text style={loginStyles.signupText}>
// // //                 Sign Up →
// // //               </Text>
// // //             </TouchableOpacity>

// // //           </View>

// // //         </ScrollView>

// // //       </KeyboardAvoidingView>
// // //     </SafeAreaView>
// // //   );
// // // // }
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   TouchableOpacity,
// // //   TextInput,
// // //   Alert,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // import Header from '../../components/common/Header';
// // // import InputField from '../../components/form/InputField';
// // // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // // import { loginStyles } from '../../styles/screens/loginStyles';

// // // // ⭐ BACKEND URL
// // // const BASE_URL = 'http://10.89.127.72:9090';

// // // export default function LoginScreen({ navigation }) {

// // //   const [phone, setPhone] = useState('');
// // //   const [otpSent, setOtpSent] = useState(false);
// // //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// // //   const [timer, setTimer] = useState(30);
// // //   const [canResend, setCanResend] = useState(false);

// // //   const inputs = useRef([]);

// // //   // =========================
// // //   // TIMER
// // //   // =========================
// // //   useEffect(() => {
// // //     let interval;

// // //     if (otpSent && timer > 0) {
// // //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// // //     }

// // //     if (timer === 0) setCanResend(true);

// // //     return () => clearInterval(interval);
// // //   }, [otpSent, timer]);

// // //   // =========================
// // //   // PHONE INPUT
// // //   // =========================
// // //   const handlePhoneChange = (text) => {
// // //     let cleaned = text.replace(/\D/g, '');
// // //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// // //     setPhone(cleaned);
// // //   };

// // //   // =========================
// // //   // SEND OTP
// // //   // =========================
// // //   const handleSendOtp = async () => {

// // //     if (!/^[1-9]\d{9}$/.test(phone)) {
// // //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include', // ⭐ SESSION SUPPORT
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         setOtpSent(true);
// // //         setTimer(30);
// // //         setCanResend(false);
// // //         Alert.alert('OTP Sent', 'Check your mobile');
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to send OTP');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // =========================
// // //   // RESEND OTP
// // //   // =========================
// // //   const handleResendOtp = async () => {

// // //     if (!canResend) return;

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',
// // //         body: JSON.stringify({ mobileNumber: phone }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {
// // //         setTimer(30);
// // //         setCanResend(false);
// // //         Alert.alert('OTP Resent');
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Network error');
// // //     }
// // //   };

// // //   // =========================
// // //   // VERIFY OTP → LOGIN
// // //   // =========================
// // //   const handleLogin = async () => {

// // //     const enteredOtp = otp.join('');

// // //     if (enteredOtp.length !== 6) {
// // //       Alert.alert('Error', 'Enter 6-digit OTP');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include', // ⭐ SESSION CREATED
// // //         body: JSON.stringify({
// // //           mobileNumber: phone,
// // //           otp: enteredOtp,
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.status === 1) {

// // //         Alert.alert('Success', 'Login successful');

// // //         // ✅ Go to main screen
// // //         navigation.replace('Landing');

// // //       } else {
// // //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// // //       }

// // //     } catch {
// // //       Alert.alert('Error', 'Login failed');
// // //     }
// // //   };

// // //   // =========================
// // //   // OTP INPUT
// // //   // =========================
// // //   const handleOtpChange = (value, index) => {
// // //     const copy = [...otp];
// // //     copy[index] = value;
// // //     setOtp(copy);

// // //     if (value && index < 5) {
// // //       inputs.current[index + 1].focus();
// // //     }
// // //   };

// // //   // =========================
// // //   // UI
// // //   // =========================
// // //   return (
// // //     <SafeAreaView style={loginStyles.safe}>
// // //       <KeyboardAvoidingView
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //         style={{ flex: 1 }}
// // //       >

// // //         <ScrollView contentContainerStyle={loginStyles.container}>

// // //           {/* ===== OLD HEADER / LOGO AREA ===== */}
// // //           <Header style={loginStyles.header}>
// // //             <View style={loginStyles.iconWrap}>
// // //               <Text style={loginStyles.icon}>💼</Text>
// // //             </View>

// // //             <Text style={loginStyles.appTitle}>
// // //               Digital Business Card
// // //             </Text>

// // //             <Text style={loginStyles.subtitle}>
// // //               Grow your business digitally
// // //             </Text>
// // //           </Header>

// // //           {/* ===== LOGIN CARD ===== */}
// // //           <View style={loginStyles.card}>

// // //             {/* PHONE INPUT */}
// // //             <InputField
// // //               placeholder="Enter mobile number"
// // //               value={phone}
// // //               onChangeText={handlePhoneChange}
// // //               keyboardType="number-pad"
// // //               showCountry
// // //               countryCode="+91"
// // //               maxLength={10}
// // //             />

// // //             {/* SEND OTP BUTTON */}
// // //             <PrimaryButton
// // //               title="Send OTP"
// // //               onPress={handleSendOtp}
// // //             />

// // //             {/* OTP INPUTS */}
// // //             {otpSent && (
// // //               <>
// // //                 <View style={loginStyles.otpRow}>
// // //                   {otp.map((digit, i) => (
// // //                     <TextInput
// // //                       key={i}
// // //                       ref={(r) => inputs.current[i] = r}
// // //                       style={loginStyles.otpBox}
// // //                       keyboardType="number-pad"
// // //                       maxLength={1}
// // //                       value={digit}
// // //                       onChangeText={(v) => handleOtpChange(v, i)}
// // //                     />
// // //                   ))}
// // //                 </View>

// // //                 {/* RESEND */}
// // //                 <TouchableOpacity
// // //                   onPress={handleResendOtp}
// // //                   disabled={!canResend}
// // //                   style={loginStyles.resendWrap}
// // //                 >
// // //                   <Text style={loginStyles.resendText}>
// // //                     {canResend
// // //                       ? 'Resend OTP'
// // //                       : `Resend OTP in ${timer}s`}
// // //                   </Text>
// // //                 </TouchableOpacity>
// // //               </>
// // //             )}

// // //             {/* LOGIN BUTTON */}
// // //             <PrimaryButton
// // //               title="Login"
// // //               onPress={handleLogin}
// // //               style={loginStyles.loginBtn}
// // //             />

// // //             {/* ===== SIGNUP LINK ===== */}
// // //             <View style={loginStyles.dividerRow}>
// // //               <View style={loginStyles.line} />
// // //               <Text style={loginStyles.newHereText}>
// // //                 New here?
// // //               </Text>
// // //               <View style={loginStyles.line} />
// // //             </View>

// // //             <TouchableOpacity
// // //               style={loginStyles.signupRow}
// // //               onPress={() => navigation.navigate('Signup')}
// // //             >
// // //               <Text style={loginStyles.createText}>
// // //                 Create your account
// // //               </Text>

// // //               <Text style={loginStyles.signupText}>
// // //                 Sign Up →
// // //               </Text>
// // //             </TouchableOpacity>

// // //           </View>

// // //         </ScrollView>

// // //       </KeyboardAvoidingView>
// // //     </SafeAreaView>
// // //   );
// // // }


// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   TouchableOpacity,
// //   TextInput,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // import Header from '../../components/common/Header';
// // import InputField from '../../components/form/InputField';
// // import PrimaryButton from '../../components/buttons/PrimaryButton';
// // import { loginStyles } from '../../styles/screens/loginStyles';

// // // ⭐ BACKEND URL
// // const BASE_URL = 'http://10.89.127.72:9090';

// // export default function LoginScreen({ navigation }) {

// //   const [phone, setPhone] = useState('');
// //   const [otpSent, setOtpSent] = useState(false);
// //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// //   const [timer, setTimer] = useState(30);
// //   const [canResend, setCanResend] = useState(false);

// //   const inputs = useRef([]);

// //   // ================= TIMER =================
// //   useEffect(() => {
// //     let interval;

// //     if (otpSent && timer > 0) {
// //       interval = setInterval(() => setTimer(t => t - 1), 1000);
// //     }

// //     if (timer === 0) setCanResend(true);

// //     return () => clearInterval(interval);
// //   }, [otpSent, timer]);

// //   // ================= PHONE INPUT =================
// //   const handlePhoneChange = (text) => {
// //     let cleaned = text.replace(/\D/g, '');
// //     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
// //     setPhone(cleaned);
// //   };

// //   // ================= SEND OTP =================
// //   const handleSendOtp = async () => {

// //     if (!/^[1-9]\d{9}$/.test(phone)) {
// //       Alert.alert('Invalid Number', 'Enter valid mobile number');
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include', // ⭐ SESSION SUPPORT
// //         body: JSON.stringify({ mobileNumber: phone }),
// //       });

// //       const data = await res.json();

// //       if (res.ok && data.status === 1) {
// //         setOtpSent(true);
// //         setTimer(30);
// //         setCanResend(false);
// //         Alert.alert('OTP Sent', 'Check your mobile');
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to send OTP');
// //       }

// //     } catch {
// //       Alert.alert('Error', 'Network error');
// //     }
// //   };

// //   // ================= RESEND OTP =================
// //   const handleResendOtp = async () => {

// //     if (!canResend) return;

// //     try {
// //       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify({ mobileNumber: phone }),
// //       });

// //       const data = await res.json();

// //       if (res.ok && data.status === 1) {
// //         setTimer(30);
// //         setCanResend(false);
// //         Alert.alert('OTP Resent');
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed');
// //       }

// //     } catch {
// //       Alert.alert('Error', 'Network error');
// //     }
// //   };

// //   // ================= LOGIN (VERIFY OTP) =================
// //   const handleLogin = async () => {

// //     const enteredOtp = otp.join('');

// //     if (enteredOtp.length !== 6) {
// //       Alert.alert('Error', 'Enter 6-digit OTP');
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include', // ⭐ SESSION CREATED
// //         body: JSON.stringify({
// //           mobileNumber: phone,
// //           otp: enteredOtp,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (res.ok && data.status === 1) {

// //         Alert.alert('Success', 'Login successful');

// //         // ✅ Navigate to main app
// //         navigation.replace('Landing');

// //       } else {
// //         Alert.alert('Login Failed', data.message || 'Invalid OTP');
// //       }

// //     } catch {
// //       Alert.alert('Error', 'Login failed');
// //     }
// //   };

// //   // ================= OTP INPUT =================
// //   const handleOtpChange = (value, index) => {
// //     const copy = [...otp];
// //     copy[index] = value;
// //     setOtp(copy);

// //     if (value && index < 5) {
// //       inputs.current[index + 1].focus();
// //     }
// //   };

// //   // ================= UI =================
// //   return (
// //     <SafeAreaView style={loginStyles.safe}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={{ flex: 1 }}
// //       >

// //         <ScrollView contentContainerStyle={loginStyles.container}>

// //           {/* ===== HEADER / LOGO ===== */}
// //           <Header style={loginStyles.header}>
// //             <View style={loginStyles.iconWrap}>
// //               <Text style={loginStyles.icon}>💼</Text>
// //             </View>

// //             <Text style={loginStyles.appTitle}>
// //               Digital Business Card
// //             </Text>

// //             <Text style={loginStyles.subtitle}>
// //               Grow your business digitally
// //             </Text>
// //           </Header>

// //           {/* ===== LOGIN CARD ===== */}
// //           <View style={loginStyles.card}>

// //             {/* PHONE INPUT */}
// //             <InputField
// //               placeholder="Enter mobile number"
// //               value={phone}
// //               onChangeText={handlePhoneChange}
// //               keyboardType="number-pad"
// //               showCountry
// //               countryCode="+91"
// //               maxLength={10}
// //             />

// //             {/* SEND OTP BUTTON */}
// //             <PrimaryButton
// //               title="Send OTP"
// //               onPress={handleSendOtp}
// //             />

// //             {/* OTP INPUTS */}
// //             {otpSent && (
// //               <>
// //                 <View style={loginStyles.otpRow}>
// //                   {otp.map((digit, i) => (
// //                     <TextInput
// //                       key={i}
// //                       ref={(r) => inputs.current[i] = r}
// //                       style={loginStyles.otpBox}
// //                       keyboardType="number-pad"
// //                       maxLength={1}
// //                       value={digit}
// //                       onChangeText={(v) => handleOtpChange(v, i)}
// //                     />
// //                   ))}
// //                 </View>

// //                 {/* RESEND */}
// //                 <TouchableOpacity
// //                   onPress={handleResendOtp}
// //                   disabled={!canResend}
// //                   style={loginStyles.resendWrap}
// //                 >
// //                   <Text style={loginStyles.resendText}>
// //                     {canResend
// //                       ? 'Resend OTP'
// //                       : `Resend OTP in ${timer}s`}
// //                   </Text>
// //                 </TouchableOpacity>
// //               </>
// //             )}

// //             {/* LOGIN BUTTON */}
// //             <PrimaryButton
// //               title="Login"
// //               onPress={handleLogin}
// //               style={loginStyles.loginBtn}
// //             />

// //             {/* ===== SIGNUP LINK ===== */}
// //             <View style={loginStyles.dividerRow}>
// //               <View style={loginStyles.line} />
// //               <Text style={loginStyles.newHereText}>
// //                 New here?
// //               </Text>
// //               <View style={loginStyles.line} />
// //             </View>

// //             <TouchableOpacity
// //               style={loginStyles.signupRow}
// //               onPress={() => navigation.navigate('Signup')}
// //             >
// //               <Text style={loginStyles.createText}>
// //                 Create your account
// //               </Text>

// //               <Text style={loginStyles.signupText}>
// //                 Sign Up →
// //               </Text>
// //             </TouchableOpacity>

// //           </View>

// //         </ScrollView>

// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import Header from '../../components/common/Header';
// import InputField from '../../components/form/InputField';
// import PrimaryButton from '../../components/buttons/PrimaryButton';
// import { loginStyles } from '../../styles/screens/loginStyles';

// // ⭐ BACKEND URL
// const BASE_URL = 'http://10.89.127.72:9090';

// export default function LoginScreen({ navigation }) {

//   const [phone, setPhone] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   const inputs = useRef([]);

//   // =========================
//   // TIMER
//   // =========================
//   useEffect(() => {
//     let interval;

//     if (otpSent && timer > 0) {
//       interval = setInterval(() => setTimer(t => t - 1), 1000);
//     }

//     if (timer === 0) setCanResend(true);

//     return () => clearInterval(interval);
//   }, [otpSent, timer]);

//   // =========================
//   // PHONE INPUT
//   // =========================
//   const handlePhoneChange = (text) => {
//     let cleaned = text.replace(/\D/g, '');
//     if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
//     setPhone(cleaned);
//   };

//   // =========================
//   // SEND OTP
//   // =========================
//   const handleSendOtp = async () => {

//     if (!/^[1-9]\d{9}$/.test(phone)) {
//       Alert.alert('Invalid Number', 'Enter valid mobile number');
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/auth/mobile/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // ⭐ SESSION SUPPORT
//         body: JSON.stringify({ mobileNumber: phone }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 1) {
//         setOtpSent(true);
//         setTimer(30);
//         setCanResend(false);
//         Alert.alert('OTP Sent', 'Check your mobile');
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP');
//       }

//     } catch {
//       Alert.alert('Error', 'Network error');
//     }
//   };

//   // =========================
//   // RESEND OTP
//   // =========================
//   const handleResendOtp = async () => {

//     if (!canResend) return;

//     try {
//       const res = await fetch(`${BASE_URL}/auth/resend/login-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ mobileNumber: phone }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 1) {
//         setTimer(30);
//         setCanResend(false);
//         Alert.alert('OTP Resent');
//       } else {
//         Alert.alert('Error', data.message || 'Failed');
//       }

//     } catch {
//       Alert.alert('Error', 'Network error');
//     }
//   };

//   // =========================
//   // VERIFY OTP → LOGIN
//   // =========================
//   const handleLogin = async () => {

//     const enteredOtp = otp.join('');

//     if (enteredOtp.length !== 6) {
//       Alert.alert('Error', 'Enter 6-digit OTP');
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // ⭐ SESSION CREATED
//         body: JSON.stringify({
//           mobileNumber: phone,
//           otp: enteredOtp,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 1) {

//         Alert.alert('Success', 'Login successful');

//         // ✅ Navigate to main app
//         navigation.replace('Landing');

//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid OTP');
//       }

//     } catch {
//       Alert.alert('Error', 'Login failed');
//     }
//   };

//   // =========================
//   // OTP INPUT HANDLING
//   // =========================
//   const handleOtpChange = (value, index) => {
//     const copy = [...otp];
//     copy[index] = value;
//     setOtp(copy);

//     if (value && index < 5) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <SafeAreaView style={loginStyles.safe}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >

//         <ScrollView contentContainerStyle={loginStyles.container}>

//           {/* ===== HEADER / LOGO AREA ===== */}
//           <Header style={loginStyles.header}>
//             <View style={loginStyles.iconWrap}>
//               <Text style={loginStyles.icon}>💼</Text>
//             </View>

//             <Text style={loginStyles.appTitle}>
//               Digital Business Card
//             </Text>

//             <Text style={loginStyles.subtitle}>
//               Grow your business digitally
//             </Text>
//           </Header>

//           {/* ===== LOGIN CARD ===== */}
//           <View style={loginStyles.card}>

//             {/* PHONE INPUT */}
//             <InputField
//               placeholder="Enter mobile number"
//               value={phone}
//               onChangeText={handlePhoneChange}
//               keyboardType="number-pad"
//               showCountry
//               countryCode="+91"
//               maxLength={10}
//             />

//             {/* SEND OTP */}
//             <PrimaryButton
//               title="Send OTP"
//               onPress={handleSendOtp}
//             />

//             {/* OTP INPUTS */}
//             {otpSent && (
//               <>
//                 <View style={loginStyles.otpRow}>
//                   {otp.map((digit, i) => (
//                     <TextInput
//                       key={i}
//                       ref={(r) => inputs.current[i] = r}
//                       style={loginStyles.otpBox}
//                       keyboardType="number-pad"
//                       maxLength={1}
//                       value={digit}
//                       onChangeText={(v) => handleOtpChange(v, i)}
//                     />
//                   ))}
//                 </View>

//                 {/* RESEND */}
//                 <TouchableOpacity
//                   onPress={handleResendOtp}
//                   disabled={!canResend}
//                   style={loginStyles.resendWrap}
//                 >
//                   <Text style={loginStyles.resendText}>
//                     {canResend
//                       ? 'Resend OTP'
//                       : `Resend OTP in ${timer}s`}
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             )}

//             {/* LOGIN BUTTON */}
//             <PrimaryButton
//               title="Login"
//               onPress={handleLogin}
//               style={loginStyles.loginBtn}
//             />

//             {/* SIGNUP LINK (PUBLIC) */}
//             <View style={loginStyles.dividerRow}>
//               <View style={loginStyles.line} />
//               <Text style={loginStyles.newHereText}>
//                 New here?
//               </Text>
//               <View style={loginStyles.line} />
//             </View>

//             <TouchableOpacity
//               style={loginStyles.signupRow}
//               onPress={() => navigation.navigate('Signup')}
//             >
//               <Text style={loginStyles.createText}>
//                 Create your account
//               </Text>

//               <Text style={loginStyles.signupText}>
//                 Sign Up →
//               </Text>
//             </TouchableOpacity>

//           </View>

//         </ScrollView>

//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/common/Header';
import InputField from '../../components/form/InputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { loginStyles } from '../../styles/screens/loginStyles';

import { apiFetch } from '../../utils/api';

export default function LoginScreen({ navigation }) {

  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef([]);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {

    let interval;

    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }

    if (timer === 0) setCanResend(true);

    return () => clearInterval(interval);

  }, [otpSent, timer]);

  // =========================
  // PHONE INPUT
  // =========================
  const handlePhoneChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setPhone(cleaned);
  };

  // =========================
  // SEND OTP
  // =========================
  const handleSendOtp = async () => {

    if (!/^[1-9]\d{9}$/.test(phone)) {
      Alert.alert('Invalid Number', 'Enter valid mobile number');
      return;
    }

    try {

      const { res, data } = await apiFetch('/auth/mobile/login', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber: phone }),
      });

      if (res.ok && data.status === 1) {
        setOtpSent(true);
        setTimer(30);
        setCanResend(false);
        Alert.alert('OTP Sent', 'Check your mobile');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }

    } catch {
      Alert.alert('Error', 'Network error');
    }
  };

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = async () => {

    if (!canResend) return;

    try {

      const { res, data } = await apiFetch('/auth/resend/login-otp', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber: phone }),
      });

      if (res.ok && data.status === 1) {
        setTimer(30);
        setCanResend(false);
        Alert.alert('OTP Resent');
      } else {
        Alert.alert('Error', data.message || 'Failed');
      }

    } catch {
      Alert.alert('Error', 'Network error');
    }
  };

  // =========================
  // LOGIN VERIFY OTP
  // =========================
  const handleLogin = async () => {

    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      Alert.alert('Error', 'Enter 6-digit OTP');
      return;
    }

    try {

      const { res, data } = await apiFetch('/auth/login/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          mobileNumber: phone,
          otp: enteredOtp,
        }),
      });

      if (res.ok && data.status === 1) {

        Alert.alert('Success', 'Login successful');

        navigation.replace('Landing');

      } else {
        Alert.alert('Login Failed', data.message || 'Invalid OTP');
      }

    } catch {
      Alert.alert('Error', 'Login failed');
    }
  };

  // =========================
  // OTP INPUT HANDLING
  // =========================
  const handleOtpChange = (value, index) => {

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <SafeAreaView style={loginStyles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >

        <ScrollView contentContainerStyle={loginStyles.container}>

          {/* ===== HEADER / LOGO ===== */}
          <Header style={loginStyles.header}>
            <View style={loginStyles.iconWrap}>
              <Text style={loginStyles.icon}>💼</Text>
            </View>

            <Text style={loginStyles.appTitle}>
              Digital Business Card
            </Text>

            <Text style={loginStyles.subtitle}>
              Grow your business digitally
            </Text>
          </Header>

          {/* ===== LOGIN CARD ===== */}
          <View style={loginStyles.card}>

            {/* PHONE INPUT */}
            <InputField
              placeholder="Enter mobile number"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="number-pad"
              showCountry
              countryCode="+91"
              maxLength={10}
            />

            {/* SEND OTP */}
            <PrimaryButton
              title="Send OTP"
              onPress={handleSendOtp}
            />

            {/* OTP INPUTS */}
            {otpSent && (
              <>
                <View style={loginStyles.otpRow}>
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(r) => inputs.current[i] = r}
                      style={loginStyles.otpBox}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(v) => handleOtpChange(v, i)}
                    />
                  ))}
                </View>

                {/* RESEND */}
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

            {/* LOGIN BUTTON */}
            <PrimaryButton
              title="Login"
              onPress={handleLogin}
              style={loginStyles.loginBtn}
            />

            {/* SIGNUP LINK */}
            <View style={loginStyles.dividerRow}>
              <View style={loginStyles.line} />
              <Text style={loginStyles.newHereText}>
                New here?
              </Text>
              <View style={loginStyles.line} />
            </View>

            <TouchableOpacity
              style={loginStyles.signupRow}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={loginStyles.createText}>
                Create your account
              </Text>

              <Text style={loginStyles.signupText}>
                Sign Up →
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
