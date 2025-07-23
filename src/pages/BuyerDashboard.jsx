import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  XCircle,
  DollarSign,
  Building,
  Calendar,
  ArrowRight
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';

const BuyerDashboard = () => {
  const { user } = useAuthStore();
  const { listings } = useAppStore();
  
  // TODO: Replace with actual API calls
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const [statsRes, offersRes] = await Promise.all([
  //         buyerAPI.getDashboard(),
  //         buyerAPI.getMyOffers()
  //       ]);
  //       setStats(statsRes.data);
  //       setRecentOffers(offersRes.data);
  //     } catch (error) {
  //       toast.error('Failed to load dashboard data');
  //     }
  //   };
  //   fetchDashboardData();
  // }, []);
  
  const [stats, setStats] = useState({
    totalOffers: 5,
    activeOffers: 2,
    savedListings: 8,
    messagesUnread: 3
  });

  const [recentOffers] = useState([
    {
      id: 1,
      listingTitle: 'SaaS Analytics Platform',
      offerAmount: 450000,
      status: 'pending',
      submittedAt: '2024-01-15',
      expiresAt: '2024-01-22'
    },
    {
      id: 2,
      listingTitle: 'E-commerce Fashion Store',
      offerAmount: 1200000,
      status: 'accepted',
      submittedAt: '2024-01-10',
      expiresAt: '2024-01-17'
    },
    {
      id: 3,
      listingTitle: 'EdTech Learning Platform',
      offerAmount: 750000,
      status: 'rejected',
      submittedAt: '2024-01-08',
      expiresAt: '2024-01-15'
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
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'accepted': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your offers and discover new opportunities</p>
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
                <p className="text-sm text-gray-500 mb-1">Total Offers</p>
                <p className="text-2xl font-bold text-primary-900">{stats.totalOffers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-500 mb-1">Active Offers</p>
                <p className="text-2xl font-bold text-primary-900">{stats.activeOffers}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
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
                <p className="text-sm text-gray-500 mb-1">Saved Listings</p>
                <p className="text-2xl font-bold text-primary-900">{stats.savedListings}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
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
                <p className="text-sm text-gray-500 mb-1">Unread Messages</p>
                <p className="text-2xl font-bold text-primary-900">{stats.messagesUnread}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Offers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-900">Recent Offers</h2>
                <Link to="/buyer/offers" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentOffers.map((offer) => {
                  const StatusIcon = getStatusIcon(offer.status);
                  return (
                    <div key={offer.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-primary-900">{offer.listingTitle}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">Offer Amount:</span>
                          <p className="font-medium text-primary-900">{formatCurrency(offer.offerAmount)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Submitted:</span>
                          <p className="font-medium">{new Date(offer.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/explore"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Eye className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Browse Listings</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                
                <Link
                  to="/buyer/saved"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Saved Listings</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                
                <Link
                  to="/messages"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Messages</span>
                  {stats.messagesUnread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                      {stats.messagesUnread}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Market Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Deal Time</span>
                  <span className="font-medium text-primary-900">32 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Revenue Multiple</span>
                  <span className="font-medium text-primary-900">3.2x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;