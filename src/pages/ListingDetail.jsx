import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Heart,
  MessageCircle,
  DollarSign,
  Building,
  Globe,
  Eye,
  Share2,
  Flag
} from 'lucide-react';
import useAppStore from '../store/appStore';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings } = useAppStore();
  const { user, isAuthenticated } = useAuthStore();
  const [listing, setListing] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const foundListing = listings.find(l => l.id === parseInt(id));
    if (foundListing) {
      setListing(foundListing);
    }
  }, [id, listings]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount?.toLocaleString()}`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSaveListing = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save listings');
      return;
    }
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Listing removed from saved' : 'Listing saved successfully');
  };

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      toast.error('Please login to make an offer');
      navigate('/auth');
      return;
    }
    if (user?.role !== 'BUYER') {
      toast.error('Only buyers can make offers');
      return;
    }
    navigate(`/make-offer/${id}`);
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      toast.error('Please login to contact seller');
      navigate('/auth');
      return;
    }
    toast.success('Redirecting to chat...');
    // Navigate to chat or open modal
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

  const revenueMultiple = (listing.askingPrice / (listing.revenue * 12)).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-primary-900">{listing.title}</h1>
                {listing.verified && (
                  <Shield className="w-6 h-6 text-green-500" title="Verified Listing" />
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Listed {formatDate(listing.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  1,234 views
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="badge badge-info">{listing.category}</span>
                {listing.tags?.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveListing}
                  className={`p-2 rounded-lg border transition-colors duration-200 ${
                    isSaved 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-gray-300 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-primary-900 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-red-600 transition-colors duration-200">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">About This Business</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Key Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {formatCurrency(listing.revenue)}
                  </div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {revenueMultiple}x
                  </div>
                  <div className="text-sm text-gray-500">Revenue Multiple</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-sm text-gray-500">Team Size</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {new Date().getFullYear() - 2020}
                  </div>
                  <div className="text-sm text-gray-500">Years Active</div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Business Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Business Model</span>
                    <p className="text-gray-900">Subscription-based SaaS</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Target Market</span>
                    <p className="text-gray-900">Small to Medium Businesses</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Growth Rate</span>
                    <p className="text-gray-900">15% MoM</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Profit Margin</span>
                    <p className="text-gray-900">40%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Seller Information</h2>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-900 font-medium">
                    {listing.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{listing.seller.name}</span>
                    {listing.seller.verified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Verified Seller • Member since 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-900 mb-2">
                  {formatCurrency(listing.askingPrice)}
                </div>
                <p className="text-gray-500">Asking Price</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly Revenue</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(listing.revenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Revenue Multiple</span>
                  <span className="font-medium">{revenueMultiple}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Annual Revenue</span>
                  <span className="font-medium">
                    {formatCurrency(listing.revenue * 12)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleMakeOffer}
                  className="w-full btn-primary py-3 text-center"
                >
                  Make an Offer
                </button>
                <button
                  onClick={handleContactSeller}
                  className="w-full btn-secondary py-3 text-center flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Seller
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure transaction with escrow protection
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-primary-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium">{listing.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium">{listing.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Listed</span>
                  <span className="font-medium">{formatDate(listing.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Views</span>
                  <span className="font-medium">1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;