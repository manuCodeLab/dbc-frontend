import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Login');
    }, 2500); // 2.5 sec

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      {/* White circle logo */}
      <View style={styles.circle}>
        <Image
          source={require('../../assets/splash-icon.png')} // your bag image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Text under logo */}
      <Text style={styles.subtitle}>Grow your business digitally</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    backgroundColor: COLORS.accent,
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  logo: {
    width: 250,
    height: 250,
  },

  subtitle: {
    color: COLORS.accent,
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

});
