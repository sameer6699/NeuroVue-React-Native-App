export const ENV = {
  API_BASE_URL: 'http://192.168.31.244:5000',
  API_ENDPOINTS: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
    UPDATE_PROFILE: '/api/users/update-profile',
  },
};

export const getApiUrl = (endpoint: string) => {
  return `${ENV.API_BASE_URL}${endpoint}`;
}; 