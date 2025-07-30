// Environment configuration for API URLs and CORS settings
const config = {
  development: {
    apiUrl: '/api', // Use proxy in development
    corsEnabled: true,
    credentials: true,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://8080-firebase-acquire-b-1753295086620.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api',
    corsEnabled: true,
    credentials: true,
  },
  staging: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://8080-firebase-acquire-b-1753295086620.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api',
    corsEnabled: true,
    credentials: true,
  },
};

// Get current environment
const getEnvironment = () => {
  if (import.meta.env.DEV) return 'development';
  if (import.meta.env.MODE === 'staging') return 'staging';
  return 'production';
};

// Export current environment config
export const envConfig = config[getEnvironment()];

// Export environment helper functions
export const isDevelopment = () => getEnvironment() === 'development';
export const isProduction = () => getEnvironment() === 'production';
export const isStaging = () => getEnvironment() === 'staging';

export default envConfig; 