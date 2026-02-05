import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const PrimaryButton = ({ title, onPress, variant = 'primary' }) => {
  const filled = variant === 'primary';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, filled ? styles.filled : styles.outlined]}
    >
      <Text style={[styles.title, filled ? styles.titleFilled : styles.titleOutlined]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  filled: {
    backgroundColor: COLORS.accent,
  },
  outlined: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleFilled: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  titleOutlined: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});

export default PrimaryButton;
