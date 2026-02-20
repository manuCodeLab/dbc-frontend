// // Base API URL (no /api)
// const BASE_URL = 'http://10.89.127.72:9090';

// // Default headers
// const defaultHeaders = {
//   'Content-Type': 'application/json',
// };


// ===============================
// GLOBAL API CONFIG
// ===============================

// ⭐ Base URL (NO /api)
// export const BASE_URL = 'http://10.89.127.72:9090';


export const BASE_URL = 'http://192.168.0.53:9090';

// Default headers
export const defaultHeaders = {
  'Content-Type': 'application/json',
};

// ===============================
// COMMON FETCH WRAPPER
// ===============================

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include', // ⭐ IMPORTANT FOR SESSION
    headers: defaultHeaders,
    ...options,
  });

  const data = await res.json();

  return { res, data };
};
