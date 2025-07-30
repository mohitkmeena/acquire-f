# CORS Configuration Improvements

## Overview
This document outlines the CORS (Cross-Origin Resource Sharing) configuration improvements made to the Acquire application to ensure better cross-origin request handling.

## Changes Made

### 1. Vite Development Proxy
- **File**: `vite.config.js`
- **Improvement**: Added a proxy configuration for development that routes `/api` requests to the backend server
- **Benefits**: 
  - Eliminates CORS issues during development
  - Provides better debugging with request/response logging
  - Maintains security with proper origin handling

### 2. Environment-Based Configuration
- **File**: `src/config/environment.js`
- **Improvement**: Created centralized environment configuration
- **Features**:
  - Development: Uses proxy (`/api`)
  - Production: Uses direct API URL
  - Staging: Uses direct API URL
  - Environment-specific CORS settings

### 3. Enhanced API Service
- **File**: `src/services/api.js`
- **Improvements**:
  - Environment-aware base URL selection
  - Better CORS error handling
  - Improved request/response interceptors
  - Specific CORS error detection and user feedback

### 4. CORS Headers Management
- **Features**:
  - Automatic CORS header injection based on environment
  - Proper credentials handling
  - Support for multiple HTTP methods
  - Custom headers support

## Configuration Details

### Development Environment
```javascript
// Uses Vite proxy
baseURL: '/api'
withCredentials: true
```

### Production Environment
```javascript
// Direct API calls
baseURL: 'https://your-api-domain.com/api'
withCredentials: true
```

## Error Handling

### CORS-Specific Errors
- Network connectivity issues
- CORS policy violations
- Authentication token problems
- Server unavailability

### User Feedback
- Toast notifications for different error types
- Console logging for debugging
- Automatic session management

## Best Practices Implemented

1. **Environment Separation**: Different configurations for dev/prod
2. **Security**: Proper credentials handling
3. **Error Handling**: Comprehensive error catching and user feedback
4. **Logging**: Request/response logging for debugging
5. **Flexibility**: Easy configuration changes via environment variables

## Usage

### Development
```bash
npm run dev
# Automatically uses proxy configuration
```

### Production
```bash
npm run build
# Uses direct API calls with proper CORS headers
```

## Environment Variables

Create a `.env` file with:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_CORS_ENABLED=true
VITE_CORS_CREDENTIALS=true
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check if proxy is working in development
2. **Network Errors**: Verify API URL configuration
3. **Authentication Issues**: Ensure proper token handling

### Debug Steps
1. Check browser console for CORS errors
2. Verify proxy configuration in Vite
3. Confirm API endpoint availability
4. Test with different environments

## Security Considerations

- Credentials are only sent when `withCredentials: true`
- CORS headers are environment-specific
- Proper error handling prevents information leakage
- Secure proxy configuration in development 