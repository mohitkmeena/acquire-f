import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Building, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  FileText, 
  Upload,
  Eye,
  Save,
  Send,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { ButtonLoader } from '../components/UI/LoadingSpinner';

const CreateListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const schema = yup.object({
    title: yup.string().required('Business title is required').min(10, 'Title must be at least 10 characters'),
    description: yup.string().required('Description is required').min(50, 'Description must be at least 50 characters'),
    category: yup.string().required('Category is required'),
    location: yup.string().required('Location is required'),
    askingPrice: yup.number().required('Asking price is required').min(100000, 'Minimum asking price is ₹1,00,000'),
    monthlyRevenue: yup.number().required('Monthly revenue is required').min(0, 'Revenue cannot be negative'),
    monthlyProfit: yup.number().required('Monthly profit is required'),
    yearEstablished: yup.number().required('Year established is required').min(2000, 'Year must be after 2000').max(new Date().getFullYear(), 'Year cannot be in the future'),
    employees: yup.number().required('Number of employees is required').min(1, 'Must have at least 1 employee'),
    website: yup.string().url('Must be a valid URL'),
    reasonForSelling: yup.string().required('Reason for selling is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: '',
      location: '',
    }
  });

  const categories = [
    'SaaS',
    'E-commerce',
    'Mobile App',
    'EdTech',
    'FinTech',
    'HealthTech',
    'Marketplace',
    'Content/Media',
    'Gaming',
    'Other'
  ];

  const locations = [
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Gurgaon',
    'Noida',
    'Kolkata',
    'Ahmedabad',
    'Other'
  ];

  const steps = [
    { id: 1, title: 'Basic Info', icon: Building },
    { id: 2, title: 'Financials', icon: DollarSign },
    { id: 3, title: 'Details', icon: FileText },
    { id: 4, title: 'Review', icon: Eye },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Listing data:', data);
      toast.success('Listing created successfully!');
      navigate('/seller/dashboard');
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const watchedValues = watch();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">List Your Startup</h1>
          <p className="text-gray-600">Create a comprehensive listing to attract potential buyers</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-primary-900 border-primary-900 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary-900' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {/* Authentication Check */}
            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-center">
                  You need to be logged in as a seller to create a listing.{' '}
                  <button
                    onClick={() => navigate('/auth')}
                    className="font-medium text-yellow-900 underline hover:text-yellow-700"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
            
            {user && user.role !== 'SELLER' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-center">
                  Only sellers can create listings. Please register as a seller to continue.
                </p>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-primary-900 mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="input-field"
                    placeholder="e.g., AI-Powered Analytics SaaS Platform"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="input-field"
                    placeholder="Provide a detailed description of your business, its unique value proposition, target market, and key features..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category')}
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select
                      {...register('location')}
                      className="input-field"
                    >
                      <option value="">Select location</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    {...register('website')}
                    type="url"
                    className="input-field"
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Financials */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-primary-900 mb-6">Financial Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asking Price (₹) *
                    </label>
                    <input
                      {...register('askingPrice')}
                      type="number"
                      className="input-field"
                      placeholder="5000000"
                    />
                    {errors.askingPrice && (
                      <p className="mt-1 text-sm text-red-600">{errors.askingPrice.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Revenue (₹) *
                    </label>
                    <input
                      {...register('monthlyRevenue')}
                      type="number"
                      className="input-field"
                      placeholder="500000"
                    />
                    {errors.monthlyRevenue && (
                      <p className="mt-1 text-sm text-red-600">{errors.monthlyRevenue.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Profit (₹) *
                    </label>
                    <input
                      {...register('monthlyProfit')}
                      type="number"
                      className="input-field"
                      placeholder="200000"
                    />
                    {errors.monthlyProfit && (
                      <p className="mt-1 text-sm text-red-600">{errors.monthlyProfit.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Established *
                    </label>
                    <input
                      {...register('yearEstablished')}
                      type="number"
                      className="input-field"
                      placeholder="2020"
                    />
                    {errors.yearEstablished && (
                      <p className="mt-1 text-sm text-red-600">{errors.yearEstablished.message}</p>
                    )}
                  </div>
                </div>

                {/* Revenue Multiple Display */}
                {watchedValues.askingPrice && watchedValues.monthlyRevenue && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">
                        Revenue Multiple: {(watchedValues.askingPrice / (watchedValues.monthlyRevenue * 12)).toFixed(1)}x
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-primary-900 mb-6">Additional Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees *
                  </label>
                  <input
                    {...register('employees')}
                    type="number"
                    className="input-field"
                    placeholder="10"
                  />
                  {errors.employees && (
                    <p className="mt-1 text-sm text-red-600">{errors.employees.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Selling *
                  </label>
                  <textarea
                    {...register('reasonForSelling')}
                    rows={3}
                    className="input-field"
                    placeholder="Explain why you're selling your business..."
                  />
                  {errors.reasonForSelling && (
                    <p className="mt-1 text-sm text-red-600">{errors.reasonForSelling.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Assets Included
                  </label>
                  <textarea
                    {...register('assetsIncluded')}
                    rows={3}
                    className="input-field"
                    placeholder="List key assets included in the sale (domain, social media accounts, inventory, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Growth Opportunities
                  </label>
                  <textarea
                    {...register('growthOpportunities')}
                    rows={3}
                    className="input-field"
                    placeholder="Describe potential growth opportunities for the new owner..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-primary-900 mb-6">Review Your Listing</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">{watchedValues.title}</h3>
                  <p className="text-gray-600 mb-4">{watchedValues.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Category</span>
                      <p className="font-medium">{watchedValues.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium">{watchedValues.location}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Asking Price</span>
                      <p className="font-medium">₹{watchedValues.askingPrice?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Monthly Revenue</span>
                      <p className="font-medium">₹{watchedValues.monthlyRevenue?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Your listing will be reviewed by our team before going live.
                      This typically takes 24-48 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary px-6 py-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-6 py-2 flex items-center"
                >
                  {isLoading && <ButtonLoader />}
                  Submit Listing
                  <Send className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;