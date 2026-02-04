import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  countryCode = '+91',
  showCountry = false,
}) => {
  return (
    <View style={styles.container}>
      {showCountry && (
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{countryCode}</Text>
        </View>
      )}
      <TextInput
        style={[styles.input, showCountry ? { flex: 1 } : null]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  codeBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  codeText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    color: COLORS.text,
    fontSize: 16,
  },
});

export default InputField;
