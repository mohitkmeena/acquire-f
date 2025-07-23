import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Filter, Grid, List, Trash2, Eye, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';
import ListingCard from '../components/Listings/ListingCard';

const SavedListings = () => {
  const { user } = useAuthStore();
  const { listings } = useAppStore();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Mock saved listings - in real app, this would come from API
  const [savedListings, setSavedListings] = useState([
    {
      id: 1,
      savedAt: '2024-01-18',
      notes: 'Interesting SaaS model, good growth potential'
    },
    {
      id: 2,
      savedAt: '2024-01-15',
      notes: 'Strong revenue, considering for acquisition'
    },
    {
      id: 4,
      savedAt: '2024-01-12',
      notes: 'Good team, solid business model'
    }
  ]);

  const savedListingData = savedListings.map(saved => {
    const listing = listings.find(l => l.id === saved.id);
    return listing ? { ...listing, ...saved } : null;
  }).filter(Boolean);

  const filteredListings = savedListingData.filter(listing => {
    const matchesSearch = !searchTerm || 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(savedListingData.map(listing => listing.category))];

  const handleRemoveFromSaved = (listingId) => {
    setSavedListings(prev => prev.filter(saved => saved.id !== listingId));
  };

  const handleUpdateNotes = (listingId, notes) => {
    setSavedListings(prev => prev.map(saved => 
      saved.id === listingId ? { ...saved, notes } : saved
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Saved Listings</h1>
          <p className="text-gray-600">
            Keep track of startups you're interested in
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search saved listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${
                  viewMode === 'grid'
                    ? 'bg-primary-900 text-white'
                    : 'text-gray-600 hover:text-primary-900'
                } transition-colors duration-200`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${
                  viewMode === 'list'
                    ? 'bg-primary-900 text-white'
                    : 'text-gray-600 hover:text-primary-900'
                } transition-colors duration-200`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredListings.length} saved listing{filteredListings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {savedListings.length === 0 ? 'No saved listings yet' : 'No listings match your filters'}
            </h3>
            <p className="text-gray-600 mb-6">
              {savedListings.length === 0 
                ? 'Start exploring and save listings you\'re interested in'
                : 'Try adjusting your search or filters'
              }
            </p>
            <Link to="/explore" className="btn-primary">
              Explore Listings
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                {viewMode === 'grid' ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <ListingCard listing={listing} viewMode="grid" />
                    
                    {/* Saved-specific actions */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">
                          Saved on {new Date(listing.savedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleRemoveFromSaved(listing.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {listing.notes && (
                        <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                          <strong>Notes:</strong> {listing.notes}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-3">
                        <Link
                          to={`/listing/${listing.id}`}
                          className="flex-1 btn-secondary text-xs py-2 text-center"
                        >
                          <Eye className="w-3 h-3 mr-1 inline" />
                          View
                        </Link>
                        <Link
                          to={`/make-offer/${listing.id}`}
                          className="flex-1 btn-primary text-xs py-2 text-center"
                        >
                          Make Offer
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <ListingCard listing={listing} viewMode="list" />
                      </div>
                      
                      <div className="w-64 flex-shrink-0 border-l pl-6">
                        <div className="mb-4">
                          <span className="text-sm text-gray-500">Saved on</span>
                          <p className="font-medium">{new Date(listing.savedAt).toLocaleDateString()}</p>
                        </div>
                        
                        {listing.notes && (
                          <div className="mb-4">
                            <span className="text-sm text-gray-500">Notes</span>
                            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-1">
                              {listing.notes}
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Link
                            to={`/listing/${listing.id}`}
                            className="w-full btn-secondary text-sm py-2 text-center flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                          <Link
                            to={`/make-offer/${listing.id}`}
                            className="w-full btn-primary text-sm py-2 text-center"
                          >
                            Make Offer
                          </Link>
                          <button
                            onClick={() => handleRemoveFromSaved(listing.id)}
                            className="w-full text-red-600 hover:text-red-700 text-sm py-2 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 mr-2 inline" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedListings;