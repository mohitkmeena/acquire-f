import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Building, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { ButtonLoader } from '../components/UI/LoadingSpinner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('BUYER');
  const navigate = useNavigate();
  const { login, setLoading, isLoading, loginAsBuyer, loginAsSeller, loginAsAdmin } = useAuthStore();

  // Validation schemas
  const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const registerSchema = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    companyName: yup.string().when('role', {
      is: 'SELLER',
      then: (schema) => schema.required('Company name is required for sellers'),
      otherwise: (schema) => schema,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isLogin) {
        // Simulate login API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo login logic
        const demoUser = {
          id: 1,
          name: 'Demo User',
          email: data.email,
          role: 'BUYER',
          kycStatus: 'APPROVED',
        };
        
        login(demoUser, 'demo-token');
        toast.success('Login successful!');
        navigate('/');
      } else {
        // Simulate register API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          role: selectedRole,
          kycStatus: 'PENDING',
          phone: data.phone,
          companyName: data.companyName,
        };
        
        login(newUser, 'demo-token');
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const roles = [
    {
      id: 'BUYER',
      name: 'Buyer',
      description: 'Looking to acquire startups',
      icon: User,
    },
    {
      id: 'SELLER',
      name: 'Seller',
      description: 'Want to sell your startup',
      icon: Building,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-900 to-accent-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-primary-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            className="font-medium text-accent-600 hover:text-accent-500 transition-colors duration-200"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Demo Login Buttons */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Quick demo access:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={loginAsBuyer}
               type="button"
                className="text-xs px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                Demo Buyer
              </button>
              <button
                onClick={loginAsSeller}
               type="button"
                className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                Demo Seller
              </button>
            </div>
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with form</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection for Registration */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-gray-700">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'border-accent-500 bg-accent-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <role.icon className={`w-6 h-6 mx-auto mb-2 ${
                        selectedRole === role.id ? 'text-accent-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                      <div className="text-xs text-gray-500">{role.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Name Field */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="input-field mt-1"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="input-field mt-1"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            {!isLogin && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="input-field mt-1"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            )}

            {/* Company Name Field */}
            {!isLogin && selectedRole === 'SELLER' && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  {...register('companyName')}
                  type="text"
                  className="input-field mt-1"
                  placeholder="Enter your company name"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="input-field mt-1"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center py-3"
            >
              {isLoading && <ButtonLoader />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Terms and Privacy */}
          {!isLogin && (
            <p className="mt-6 text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-accent-600 hover:text-accent-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-accent-600 hover:text-accent-500">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;