import React from 'react';
import { View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../styles/colors';

const HeaderGradient = ({ children, style }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[{ backgroundImage: 'linear-gradient(180deg, #7A0019 0%, #4a0012 100%)' }, style]}>
        {children}
      </View>
    );
  }

  return (
    <LinearGradient colors={[COLORS.primary, '#4a0012']} style={style}>
      {children}
    </LinearGradient>
  );
};

export default HeaderGradient;
