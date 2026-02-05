import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

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
          <Ionicons name={icon} size={17} color={COLORS.accent} />
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
          error && { borderColor: '#FF0000' },
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
    color: COLORS.text,
  },

  star: {
    color: '#FF0000',
    fontWeight: '700',
    fontSize: 16,
  },

  error: {
    color: '#FF0000',
    fontSize: 13,
    fontWeight: '600',
  },

  // ---------- INPUT ----------
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',

    // premium shadow
    shadowColor: COLORS.accent,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // +91 pill
  countryPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },

  countryText: {
    fontWeight: '600',
    color: COLORS.accent,
  },

  // 🔥 MOST IMPORTANT PART (fixes invisible typing)
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
});
