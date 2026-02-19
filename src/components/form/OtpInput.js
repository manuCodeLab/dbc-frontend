import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../styles/colors';

const { width } = Dimensions.get('window');

const OtpInput = ({ length = 6, onChangeText, value = '', rightButton }) => {
  console.log('[DEBUG] OtpInput props:', { value, rightButton });
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newValue = (value || '').split('');
    newValue[index] = text;
    const result = newValue.join('');
    
    onChangeText(result);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value?.[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
      const newValue = (value || '').split('');
      newValue[index] = '';
      onChangeText(newValue.join(''));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsRow}>
        {Array(length)
          .fill('')
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={value?.[index] || ''}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
      </View>
      {rightButton ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.verifyBtnFull, rightButton.disabled && { opacity: 0.5 }]}
            onPress={() => {
              rightButton.onPress && rightButton.onPress();
            }}
            disabled={rightButton.disabled}
          >
            <Text style={styles.verifyText}>{rightButton.label}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 18,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '700',
    marginHorizontal: 2,
    maxWidth: 48,
  },
  buttonRow: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  verifyBtnFull: {
    width: '60%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  verifyText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});

export default OtpInput;
