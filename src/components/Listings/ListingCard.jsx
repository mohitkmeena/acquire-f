import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  Shield, 
  ExternalLink,
  Heart,
  Eye
} from 'lucide-react';

const ListingCard = ({ listing, viewMode = 'grid' }) => {
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-primary-900 hover:text-primary-700 transition-colors duration-200">
                    <Link to={`/listing/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h3>
                  {listing.verified && (
                    <Shield className="w-5 h-5 text-green-500" title="Verified Listing" />
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2">{listing.description}</p>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-info">{listing.category}</span>
              {listing.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="badge bg-gray-100 text-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {listing.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(listing.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {listing.seller.name}
                {listing.seller.verified && (
                  <Shield className="w-3 h-3 text-green-500 ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Monthly Revenue</div>
              <div className="text-lg font-semibold text-green-600 mb-3">
                {formatCurrency(listing.revenue)}
              </div>
              
              <div className="text-sm text-gray-500 mb-1">Asking Price</div>
              <div className="text-2xl font-bold text-primary-900 mb-4">
                {formatCurrency(listing.askingPrice)}
              </div>
              
              <Link
                to={`/listing/${listing.id}`}
                className="btn-primary w-full text-center inline-flex items-center justify-center"
              >
                View Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-primary-900 hover:text-primary-700 transition-colors duration-200">
              <Link to={`/listing/${listing.id}`} className="line-clamp-1">
                {listing.title}
              </Link>
            </h3>
            {listing.verified && (
              <Shield className="w-4 h-4 text-green-500 flex-shrink-0" title="Verified Listing" />
            )}
          </div>
          
          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {listing.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="badge badge-info text-xs">{listing.category}</span>
          {listing.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-700 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Monthly Revenue</div>
            <div className="text-sm font-semibold text-green-600">
              {formatCurrency(listing.revenue)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Asking Price</div>
            <div className="text-lg font-bold text-primary-900">
              {formatCurrency(listing.askingPrice)}
            </div>
          </div>
        </div>

        {/* Multiple Calculation */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-accent-500" />
          <span className="text-sm text-gray-600">
            {(listing.askingPrice / (listing.revenue * 12)).toFixed(1)}x Revenue Multiple
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            {listing.location}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {formatDate(listing.createdAt)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-900">
                {listing.seller.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600">{listing.seller.name}</span>
            {listing.seller.verified && (
              <Shield className="w-3 h-3 text-green-500" />
            )}
          </div>

          <Link
            to={`/listing/${listing.id}`}
            className="btn-primary text-sm px-4 py-2 inline-flex items-center"
          >
            View
            <Eye className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;