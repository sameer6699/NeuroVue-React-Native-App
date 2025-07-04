export const ENV = {
  API_BASE_URL: 'http://10.234.46.249:5000',
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