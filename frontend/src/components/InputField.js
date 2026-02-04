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
      {/* LABEL ROW */}
      <View style={styles.labelRow}>
        <View style={styles.left}>
          <Ionicons name={icon} size={17} color="#6b0f1a" />
          <Text style={styles.label}>
            {'  '}
            {label}
            {required && <Text style={styles.star}> *</Text>}
          </Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      {/* INPUT BOX */}
      <View
        style={[
          styles.inputBox,
          error && { borderColor: '#DC2626' },
        ]}
      >
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
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  // ---------- LABEL ----------
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  star: {
    color: '#DC2626',
    fontWeight: '700',
  },

  error: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },

  // ---------- INPUT ----------
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderWidth: 1.8,
    borderColor: '#E5E7EB',
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',

    // premium shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  // +91 pill
  countryPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },

  countryText: {
    fontWeight: '600',
    color: '#111827',
  },

  // 🔥 MOST IMPORTANT PART (fixes invisible typing)
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
});
//raghu
