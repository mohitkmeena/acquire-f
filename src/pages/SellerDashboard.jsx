import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  DollarSign,
  Building,
  Users,
  Calendar,
  ArrowRight,
  Edit,
  MoreVertical
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';

const SellerDashboard = () => {
  const { user } = useAuthStore();
  const { listings } = useAppStore();
  const [stats, setStats] = useState({
    totalListings: 3,
    activeListings: 2,
    totalViews: 1247,
    totalOffers: 8
  });

  const [myListings] = useState([
    {
      id: 1,
      title: 'SaaS Analytics Platform',
      askingPrice: 500000,
      monthlyRevenue: 50000,
      views: 456,
      offers: 3,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'E-commerce Fashion Store',
      askingPrice: 1500000,
      monthlyRevenue: 200000,
      views: 623,
      offers: 5,
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Mobile Food Delivery App',
      askingPrice: 800000,
      monthlyRevenue: 80000,
      views: 168,
      offers: 0,
      status: 'pending_review',
      createdAt: '2024-01-20'
    }
  ]);

  const [recentOffers] = useState([
    {
      id: 1,
      listingTitle: 'SaaS Analytics Platform',
      buyerName: 'Rajesh Kumar',
      offerAmount: 450000,
      status: 'pending',
      submittedAt: '2024-01-18'
    },
    {
      id: 2,
      listingTitle: 'E-commerce Fashion Store',
      buyerName: 'Priya Sharma',
      offerAmount: 1200000,
      status: 'pending',
      submittedAt: '2024-01-17'
    }
  ]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount?.toLocaleString()}`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending_review': return 'text-yellow-600 bg-yellow-100';
      case 'sold': return 'text-blue-600 bg-blue-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600">Manage your listings and track performance</p>
          </div>
          <Link
            to="/create-listing"
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Listing
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Listings</p>
                <p className="text-2xl font-bold text-primary-900">{stats.totalListings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Listings</p>
                <p className="text-2xl font-bold text-primary-900">{stats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Views</p>
                <p className="text-2xl font-bold text-primary-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Offers</p>
                <p className="text-2xl font-bold text-primary-900">{stats.totalOffers}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-900">My Listings</h2>
                <Link to="/seller/listings" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div key={listing.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-primary-900">{listing.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                            {listing.status.replace('_', ' ').charAt(0).toUpperCase() + listing.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">Asking Price:</span>
                            <p className="font-medium text-primary-900">{formatCurrency(listing.askingPrice)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Monthly Revenue:</span>
                            <p className="font-medium text-green-600">{formatCurrency(listing.monthlyRevenue)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Views:</span>
                            <p className="font-medium">{listing.views}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Offers:</span>
                            <p className="font-medium">{listing.offers}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          to={`/listing/${listing.id}`}
                          className="p-2 text-gray-400 hover:text-primary-900 transition-colors duration-200"
                          title="View Listing"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-400 hover:text-primary-900 transition-colors duration-200"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-primary-900 transition-colors duration-200"
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Offers & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Offers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-900">Recent Offers</h3>
                <Link to="/seller/offers" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-900">{offer.buyerName}</span>
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(offer.offerAmount)}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{offer.listingTitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{new Date(offer.submittedAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/create-listing"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Create New Listing</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                
                <Link
                  to="/seller/analytics"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <TrendingUp className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">View Analytics</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                
                <Link
                  to="/messages"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Messages</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;