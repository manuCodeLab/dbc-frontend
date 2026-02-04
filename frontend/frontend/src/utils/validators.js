export const isValidIndianPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const cleanPhoneInput = (text) => {
  let cleaned = text.replace(/\D/g, '');
  if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
  return cleaned;
};

export const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
