import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  Send, 
  ArrowLeft,
  Building,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';
import { ButtonLoader } from '../components/UI/LoadingSpinner';

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { listings } = useAppStore();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    offerAmount: yup.number()
      .required('Offer amount is required')
      .min(100000, 'Minimum offer is ₹1,00,000')
      .max(listing?.askingPrice * 1.5 || 999999999, 'Offer cannot exceed 150% of asking price'),
    message: yup.string()
      .required('Message is required')
      .min(50, 'Message must be at least 50 characters'),
    timeline: yup.string().required('Expected timeline is required'),
    financingType: yup.string().required('Financing type is required'),
    dueDate: yup.date()
      .required('Offer expiry date is required')
      .min(new Date(), 'Expiry date must be in the future'),
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
      financingType: 'cash',
      timeline: '30-days',
    }
  });

  useEffect(() => {
    const foundListing = listings.find(l => l.id === parseInt(id));
    if (foundListing) {
      setListing(foundListing);
      // Set default offer to 90% of asking price
      setValue('offerAmount', Math.floor(foundListing.askingPrice * 0.9));
    }
  }, [id, listings, setValue]);

  const watchedOffer = watch('offerAmount');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const offerData = {
        ...data,
        listingId: parseInt(id),
        buyerId: user.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      console.log('Offer data:', offerData);
      toast.success('Offer submitted successfully!');
      navigate('/buyer/dashboard');
    } catch (error) {
      toast.error('Failed to submit offer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount?.toLocaleString()}`;
    }
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Listing not found</h2>
          <button onClick={() => navigate('/explore')} className="btn-primary">
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Make an Offer</h1>
          <p className="text-gray-600">Submit your offer for this startup</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Listing Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{listing.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{listing.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category</span>
                    <p className="font-medium">{listing.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location</span>
                    <p className="font-medium">{listing.location}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Asking Price</span>
                      <span className="font-semibold text-primary-900">
                        {formatCurrency(listing.askingPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Revenue</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(listing.revenue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Revenue Multiple</span>
                      <span className="font-medium">
                        {(listing.askingPrice / (listing.revenue * 12)).toFixed(1)}x
                      </span>
                    </div>
                  </div>
                </div>

                {watchedOffer && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Your Offer</span>
                      <span className="font-semibold text-blue-900">
                        {formatCurrency(watchedOffer)}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {((watchedOffer / listing.askingPrice) * 100).toFixed(0)}% of asking price
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Offer Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-6">
                  {/* Offer Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Offer Amount (₹) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        {...register('offerAmount')}
                        type="number"
                        className="input-field pl-10"
                        placeholder="Enter your offer amount"
                      />
                    </div>
                    {errors.offerAmount && (
                      <p className="mt-1 text-sm text-red-600">{errors.offerAmount.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Asking price: {formatCurrency(listing.askingPrice)}
                    </p>
                  </div>

                  {/* Financing Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financing Type *
                    </label>
                    <select
                      {...register('financingType')}
                      className="input-field"
                    >
                      <option value="cash">Cash Purchase</option>
                      <option value="installments">Installment Payments</option>
                      <option value="earn-out">Earn-out Structure</option>
                      <option value="mixed">Mixed Financing</option>
                    </select>
                    {errors.financingType && (
                      <p className="mt-1 text-sm text-red-600">{errors.financingType.message}</p>
                    )}
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Closing Timeline *
                    </label>
                    <select
                      {...register('timeline')}
                      className="input-field"
                    >
                      <option value="15-days">15 Days</option>
                      <option value="30-days">30 Days</option>
                      <option value="45-days">45 Days</option>
                      <option value="60-days">60 Days</option>
                      <option value="90-days">90 Days</option>
                    </select>
                    {errors.timeline && (
                      <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                    )}
                  </div>

                  {/* Offer Expiry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Offer Expiry Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        {...register('dueDate')}
                        type="date"
                        className="input-field pl-10"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message to Seller *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="input-field"
                      placeholder="Introduce yourself, explain your interest in the business, your background, and any specific terms or conditions..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      A compelling message increases your chances of acceptance
                    </p>
                  </div>

                  {/* Terms Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Important Terms</p>
                        <ul className="space-y-1 text-xs">
                          <li>• This offer is legally binding once accepted by the seller</li>
                          <li>• All transactions are protected by our escrow service</li>
                          <li>• Due diligence period will be agreed upon separately</li>
                          <li>• Additional terms may be negotiated after initial acceptance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary px-8 py-3 flex items-center"
                    >
                      {isLoading && <ButtonLoader />}
                      Submit Offer
                      <Send className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;