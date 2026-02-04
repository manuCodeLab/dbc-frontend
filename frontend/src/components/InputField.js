import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InputField({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  showCountry,
  countryCode,
  icon,
  error,
}) {
  return (
    <View style={styles.wrapper}>
      {/* Label row */}
      <View style={styles.labelRow}>
        <View style={styles.left}>
          <Ionicons name={icon} size={17} color="#6b0f1a" />
          <Text style={styles.label}>
            {'  '}{label}
            {required && <Text style={styles.star}> *</Text>}
          </Text>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      {/* Input box */}
      <View style={[styles.inputBox, error && { borderColor: '#DC2626' }]}>
        {showCountry && (
          <View style={styles.countryPill}>
            <Text style={styles.countryText}>{countryCode}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType || 'default'}
          value={value ?? ''}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  left: { flexDirection: 'row', alignItems: 'center' },

  label: { fontSize: 15, fontWeight: '600', color: '#374151' },

  star: { color: '#DC2626', fontWeight: '700' },

  error: { color: '#DC2626', fontSize: 12 },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderWidth: 1.8,
    borderColor: '#E5E7EB',
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    elevation: 3,
  },

  countryPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },

  countryText: { fontWeight: '600', color: '#111827' },

  input: { flex: 1, fontSize: 16, color: '#111827' },
});
