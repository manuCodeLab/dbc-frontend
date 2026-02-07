import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const ScreenWrapper = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.wrapper, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default ScreenWrapper;
