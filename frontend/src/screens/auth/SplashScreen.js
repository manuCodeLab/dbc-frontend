import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../../styles/colors';
import { splashStyles } from '../../styles/screens/splashStyles';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LocationPermission');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashStyles.container}>
      {/* Logo Circle */}
      <View style={splashStyles.circle}>
        <Image
          source={require('../../../assets/splash-icon.png')}
          style={splashStyles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Tagline */}
      <Text style={splashStyles.tagline}>Grow your business digitally</Text>
    </View>
  );
}
