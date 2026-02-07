// Base API configuration
const BASE_URL = 'http://localhost:5000/api'; // Update with your actual API URL

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Make API request
 * @param {string} endpoint - API endpoint (e.g., '/users/login')
 * @param {object} options - Request options (method, data, headers, etc.)
 * @returns {Promise<object>} - API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    data = null,
    headers = {},
    timeout = 10000,
  } = options;

  const url = `${BASE_URL}${endpoint}`;
  const config = {
    method,
    headers: { ...defaultHeaders, ...headers },
    timeout,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'API Error');
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || 'Something went wrong',
    };
  }
};

/**
 * Login API call
 */
export const loginUser = (phone, otp) => {
  return apiCall('/auth/login', {
    method: 'POST',
    data: { phone, otp },
  });
};

/**
 * Signup API call
 */
export const signupUser = (userData) => {
  return apiCall('/auth/signup', {
    method: 'POST',
    data: userData,
  });
};

/**
 * Send OTP API call
 */
export const sendOtp = (phone) => {
  return apiCall('/auth/send-otp', {
    method: 'POST',
    data: { phone },
  });
};

/**
 * Get user profile API call
 */
export const getUserProfile = (userId) => {
  return apiCall(`/users/${userId}`, {
    method: 'GET',
  });
};

/**
 * Update user profile API call
 */
export const updateUserProfile = (userId, data) => {
  return apiCall(`/users/${userId}`, {
    method: 'PUT',
    data,
  });
};
