// Phone validation
export const validPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

// Email validation
export const validEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// Name validation
export const validName = (name) => name.length >= 2;

// OTP validation
export const validOtp = (otp) => otp.length === 6 && /^\d+$/.test(otp);

// Clean phone number (remove non-digits)
export const cleanPhone = (phone) => {
  return phone.replace(/\D/g, '').slice(0, 10);
};

// Clean text (remove special characters)
export const cleanText = (text, allowSpaces = false) => {
  const pattern = allowSpaces ? /[^A-Za-z ]/g : /[^A-Za-z]/g;
  return text.replace(pattern, '').slice(0, 50);
};

// Validate form
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
    } else if (rule.type === 'email' && !validEmail(value)) {
      errors[field] = 'Enter valid email';
    } else if (rule.type === 'phone' && !validPhone(value)) {
      errors[field] = 'Enter valid 10 digit number';
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Minimum ${rule.minLength} characters required`;
    }
  });

  return errors;
};
