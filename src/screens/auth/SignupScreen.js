// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';

// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Ionicons } from '@expo/vector-icons';

// // import Header from '../../components/common/Header';
// // import InputField from '../../components/form/InputField';
// // import OtpInput from '../../components/form/OtpInput';
// // import PrimaryButton from '../../components/buttons/PrimaryButton';

// // import { signupStyles } from '../../styles/screens/signupStyles';
// // import { apiFetch } from '../../utils/api';

// // export default function SignupScreen({ navigation }) {

// //   const [form, setForm] = useState({
// //     first: '',
// //     middle: '',
// //     last: '',
// //     phone: '',
// //     email: '', 
// //     otp: '',
// //   });

// //   const [otpVisible, setOtpVisible] = useState(false);
// //   const [otpVerified, setOtpVerified] = useState(false);

// //   const validPhone = (v) => /^[1-9]\d{9}$/.test(v);

// //   const handleChange = (name, value) => {
// //     setForm(p => ({ ...p, [name]: value }));
// //   };

// //   // ================= SEND OTP =================
// //   const handleSendOtp = async () => {

// //     const phone = form.phone.trim();

// //     if (!validPhone(phone)) {
// //       Alert.alert('Error', 'Enter valid mobile number');
// //       return;
// //     }

// //     try {

// //       const payload = {
// //         firstName: form.first,
// //         middleName: form.middle,
// //         lastName: form.last,
// //         email: form.email.trim(), 
// //         mobileNumber: Number(phone),   // ⭐ Long compatible
// //       };

// //       const { data } = await apiFetch('/auth/mobile-signup', {
// //         method: 'POST',
// //         body: JSON.stringify(payload),
// //       });

// //       if (data.status === 1) {
// //         setOtpVisible(true);
// //         Alert.alert('Success', 'OTP sent to mobile');
// //       } else {
// //         Alert.alert('Error', data.message);
// //       }

// //     } catch {
// //       Alert.alert('Network error');
// //     }
// //   };

// //   // ================= VERIFY OTP =================
// //   const handleVerifyOtp = async () => {

// //     const phone = form.phone.trim();

// //     try {

// //       const { data } = await apiFetch('/auth/verify-phone-otp', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           mobileNumber: Number(phone),
// //           otp: form.otp,
// //         }),
// //       });

// //       if (data.status === 1) {
// //         setOtpVerified(true);
// //         Alert.alert('Success', 'Mobile verified!');
// //       } else {
// //         Alert.alert('Error', data.message || 'Invalid OTP');
// //       }

// //     } catch {
// //       Alert.alert('Verification failed');
// //     }
// //   };

// //   // ================= RESEND OTP =================
// //   const handleResendOtp = async () => {

// //     const phone = form.phone.trim();

// //     try {

// //       const { data } = await apiFetch('/auth/resend-phone-otp', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           mobileNumber: Number(phone),
// //         }),
// //       });

// //       if (data.status === 1) {
// //         Alert.alert('OTP resent');
// //       } else {
// //         Alert.alert('Error', data.message);
// //       }

// //     } catch {
// //       Alert.alert('Network error');
// //     }
// //   };

// //   // ================= CREATE ACCOUNT =================
// //   const handleCreateAccount = () => {
// //     Alert.alert('Success', 'Account created!', [
// //       { text: 'Login', onPress: () => navigation.replace('Login') },
// //     ]);
// //   };

// //   // ================= UI =================
// //   return (
// //     <SafeAreaView style={signupStyles.safe}>
// //       <ScrollView contentContainerStyle={signupStyles.scroll}>

// //         {/* HEADER */}
// //         <Header style={signupStyles.header}>

// //           <TouchableOpacity
// //             style={signupStyles.backBtn}
// //             onPress={() => navigation.goBack()}
// //           >
// //             <Ionicons name="arrow-back" size={20} color="#fff" />
// //           </TouchableOpacity>

// //           <Text style={signupStyles.title}>
// //             Create Account
// //           </Text>

// //           <Text style={signupStyles.subtitle}>
// //             Join us today
// //           </Text>

// //         </Header>

// //         {/* FORM CARD */}
// //         <View style={signupStyles.card}>

// //           <InputField
// //             label="First Name"
// //             value={form.first}
// //             onChangeText={v => handleChange('first', v)}
// //           />

// //           <InputField
// //             label="Middle Name"
// //             value={form.middle}
// //             onChangeText={v => handleChange('middle', v)}
// //           />

// //           <InputField
// //             label="Last Name"
// //             value={form.last}
// //             onChangeText={v => handleChange('last', v)}
// //           />
// //           <InputField
// //   label="Email Address"
// //   keyboardType="email-address"
// //   value={form.email}
// //   onChangeText={v => handleChange('email', v)}
// // />


// //           <InputField
// //             label="Mobile Number"
// //             keyboardType="number-pad"
// //             value={form.phone}
// //             onChangeText={v => handleChange('phone', v)}
// //             rightButton={{
// //               label: 'Send OTP',
// //               onPress: handleSendOtp,
// //             }}
// //           />

// //           {/* OTP SECTION */}
// //           {otpVisible && (
// //             <>
// //               <OtpInput
// //                 length={6}
// //                 value={form.otp}
// //                 onChangeText={v => handleChange('otp', v)}
// //                 rightButton={{
// //                   label: otpVerified ? 'Verified' : 'Verify',
// //                   onPress: handleVerifyOtp,
// //                 }}
// //               />

// //               {!otpVerified && (
// //                 <TouchableOpacity onPress={handleResendOtp}>
// //                   <Text style={signupStyles.resend}>
// //                     Resend OTP
// //                   </Text>
// //                 </TouchableOpacity>
// //               )}
// //             </>
// //           )}

// //           {/* SHOW AFTER VERIFICATION */}
// //           {otpVerified && (
// //             <>
// //               <Text style={{
// //                 textAlign: 'center',
// //                 color: 'green',
// //                 marginVertical: 10,
// //                 fontWeight: '600'
// //               }}>
// //                 ✔ Mobile number verified
// //               </Text>

// //               <PrimaryButton
// //                 title="Create Account"
// //                 onPress={handleCreateAccount}
// //               />
// //             </>
// //           )}

// //         </View>

// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// import Header from '../../components/common/Header';
// import InputField from '../../components/form/InputField';
// import OtpInput from '../../components/form/OtpInput';
// import PrimaryButton from '../../components/buttons/PrimaryButton';

// import { signupStyles } from '../../styles/screens/signupStyles';
// import { apiFetch } from '../../utils/api';

// export default function SignupScreen({ navigation }) {

//   const [form, setForm] = useState({
//     first: '',
//     middle: '',
//     last: '',
//     phone: '',
//     email: '',
//     otp: '',
//   });

//   const [otpVisible, setOtpVisible] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);

//   const validPhone = v => /^[1-9]\d{9}$/.test(v);

//   const handleChange = (name, value) => {
//     setForm(p => ({ ...p, [name]: value }));
//   };

//   // ====================================================
//   // 📱 SEND OTP
//   // ====================================================

//   const handleSendOtp = async () => {

//     const phone = form.phone.trim();

//     if (!validPhone(phone)) {
//       Alert.alert('Error', 'Enter valid mobile number');
//       return;
//     }

//     try {

//       const payload = {
//         firstName: form.first,
//         middleName: form.middle,
//         lastName: form.last,
//         mobileNumber: Number(phone),
//         email: form.email.trim(),
//       };

//       const { data } = await apiFetch('/auth/mobile-signup', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//       });

//       if (data.status === 1) {
//         setOtpVisible(true);
//         Alert.alert('OTP sent to mobile');
//       } else {
//         Alert.alert('Error', data.message);
//       }

//     } catch {
//       Alert.alert('Network error');
//     }
//   };

//   // ====================================================
//   // ✔ VERIFY OTP ONLY (NO ACCOUNT CREATION)
//   // ====================================================

//   const handleVerifyOtp = async () => {

//     const payload = {
//       firstName: form.first,
//       middleName: form.middle,
//       lastName: form.last,
//       mobileNumber: Number(form.phone),
//       email: form.email.trim(),
//     };

//     const { data } = await apiFetch(
//       `/auth/verify-phone-otp?otp=${form.otp}`,
//       {
//         method: 'POST',
//         body: JSON.stringify(payload),
//       }
//     );

//     if (data.status === 1) {
//       setPhoneVerified(true);
//       Alert.alert('Mobile number verified!');
//     } else {
//       Alert.alert('Error', data.message);
//     }
//   };

//   // ====================================================
//   // 🧾 CREATE ACCOUNT (AFTER VERIFICATION)
//   // ====================================================

//   const handleCreateAccount = async () => {

//     const payload = {
//       firstName: form.first,
//       middleName: form.middle,
//       lastName: form.last,
//       mobileNumber: Number(form.phone),
//       email: form.email.trim(),
//     };

//     const { data } = await apiFetch('/auth/create-account', {
//       method: 'POST',
//       body: JSON.stringify(payload),
//     });

//     if (data.status === 1) {
//       Alert.alert(
//         'Success',
//         'Account created successfully!',
//         [{ text: 'Login', onPress: () => navigation.replace('Login') }]
//       );
//     } else {
//       Alert.alert('Error', data.message);
//     }
//   };

//   // ====================================================
//   // UI
//   // ====================================================

//   return (
//     <SafeAreaView style={signupStyles.safe}>
//       <ScrollView contentContainerStyle={signupStyles.scroll}>

//         {/* HEADER */}
//         <Header style={signupStyles.header}>
//           <TouchableOpacity
//             style={signupStyles.backBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="arrow-back" size={20} color="#fff" />
//           </TouchableOpacity>

//           <Text style={signupStyles.title}>Create Account</Text>
//           <Text style={signupStyles.subtitle}>Join us today</Text>
//         </Header>

//         {/* FORM */}
//         <View style={signupStyles.card}>

//           <InputField
//             label="First Name"
//             value={form.first}
//             onChangeText={v => handleChange('first', v)}
//           />

//           <InputField
//             label="Middle Name"
//             value={form.middle}
//             onChangeText={v => handleChange('middle', v)}
//           />

//           <InputField
//             label="Last Name"
//             value={form.last}
//             onChangeText={v => handleChange('last', v)}
//           />

//           <InputField
//             label="Email (Optional)"
//             keyboardType="email-address"
//             value={form.email}
//             onChangeText={v => handleChange('email', v)}
//           />

//           <InputField
//             label="Mobile Number"
//             keyboardType="number-pad"
//             value={form.phone}
//             onChangeText={v => handleChange('phone', v)}
//             rightButton={{
//               label: 'Send OTP',
//               onPress: handleSendOtp,
//             }}
//           />

//           {/* OTP SECTION */}
//           {otpVisible && (
//             <OtpInput
//               length={6}
//               value={form.otp}
//               onChangeText={v => handleChange('otp', v)}
//               rightButton={{
//                 label: phoneVerified ? 'Verified' : 'Verify',
//                 onPress: handleVerifyOtp,
//               }}
//             />
//           )}

//           {/* AFTER VERIFICATION */}
//           {phoneVerified && (
//             <>
//               <Text style={{
//                 textAlign: 'center',
//                 color: 'green',
//                 marginVertical: 10,
//                 fontWeight: '600'
//               }}>
//                 ✔ Mobile number verified
//               </Text>

//               <PrimaryButton
//                 title="Create Account"
//                 onPress={handleCreateAccount}
//               />
//             </>
//           )}

//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
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

  const [phoneOtpVisible, setPhoneOtpVisible] = useState(false);
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const validPhone = v => /^[1-9]\d{9}$/.test(v);
  const validEmail = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleChange = (name, value) => {
    setForm(p => ({ ...p, [name]: value }));
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
        setPhoneOtpVisible(true);
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
      <ScrollView contentContainerStyle={signupStyles.scroll}>

        <Header style={signupStyles.header}>
          <TouchableOpacity
            style={signupStyles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={signupStyles.title}>
            Create Account
          </Text>

          <Text style={signupStyles.subtitle}>
            Join us today
          </Text>
        </Header>

        <View style={signupStyles.card}>

          <InputField
            label="First Name"
            value={form.first}
            onChangeText={v => handleChange('first', v)}
          />

          <InputField
            label="Middle Name"
            value={form.middle}
            onChangeText={v => handleChange('middle', v)}
          />

          <InputField
            label="Last Name"
            value={form.last}
            onChangeText={v => handleChange('last', v)}
          />

          {/* EMAIL OPTIONAL */}

          <InputField
            label="Email (Optional)"
            keyboardType="email-address"
            value={form.email}
            onChangeText={v => handleChange('email', v)}
            rightButton={{
              label: 'Send OTP',
              onPress: sendEmailOtp,
            }}
          />

          {emailOtpVisible && (
            <>
              <OtpInput
                length={6}
                value={form.emailOtp}
                onChangeText={v => handleChange('emailOtp', v)}
                rightButton={{
                  label: emailVerified ? 'Verified' : 'Verify',
                  onPress: verifyEmailOtp,
                }}
              />

              {emailVerified && (
                <Text style={{
                  color: 'green',
                  textAlign: 'center',
                  marginVertical: 6
                }}>
                  ✔ Email verified
                </Text>
              )}
            </>
          )}

          {/* MOBILE REQUIRED */}

          <InputField
            label="Mobile Number"
            keyboardType="number-pad"
            value={form.phone}
            onChangeText={v => handleChange('phone', v)}
            rightButton={{
              label: 'Send OTP',
              onPress: sendPhoneOtp,
            }}
          />

          {phoneOtpVisible && (
            <>
              <OtpInput
                length={6}
                value={form.phoneOtp}
                onChangeText={v => handleChange('phoneOtp', v)}
                rightButton={{
                  label: phoneVerified ? 'Verified' : 'Verify',
                  onPress: verifyPhoneOtp,
                }}
              />

              {/* ⭐ SHOW AFTER VERIFICATION */}

              {phoneVerified && (
                <>
                  <Text style={{
                    color: 'green',
                    textAlign: 'center',
                    marginVertical: 10,
                    fontWeight: '600'
                  }}>
                    ✔ Mobile verified
                  </Text>

                  <PrimaryButton
                    title="Create Account"
                    onPress={handleCreateAccount}
                  />
                </>
              )}
            </>
          )}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
