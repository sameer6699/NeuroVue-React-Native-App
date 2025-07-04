export const ENV = {
  API_BASE_URL: 'http://192.168.190.46:5000',
  API_ENDPOINTS: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
    UPDATE_PROFILE: '/api/users/update-profile',
    RESUME_ANALYZE: '/api/resume/analyze',
  },
};

export const getApiUrl = (endpoint: string) => {
  return `${ENV.API_BASE_URL}${endpoint}`;
}; 