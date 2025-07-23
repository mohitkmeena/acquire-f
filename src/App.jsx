import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Explore from './pages/Explore';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import CreateListing from './pages/CreateListing';
import ListingDetail from './pages/ListingDetail';
import MakeOffer from './pages/MakeOffer';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SavedListings from './pages/SavedListings';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import useAuthStore from './store/authStore';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="about" element={<About />} />
            <Route path="listing/:id" element={<ListingDetail />} />
            
            {/* Auth Routes */}
            <Route 
              path="auth" 
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="create-listing" 
              element={
                <ProtectedRoute requiredRole="SELLER">
                  <CreateListing />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="make-offer/:id" 
              element={
                <ProtectedRoute requiredRole="BUYER">
                  <MakeOffer />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="buyer/*" 
              element={
                <ProtectedRoute requiredRole="BUYER">
                  <Routes>
                    <Route index element={<BuyerDashboard />} />
                    <Route path="dashboard" element={<BuyerDashboard />} />
                    <Route path="saved" element={<SavedListings />} />
                    <Route path="offers" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-primary-900 mb-4">My Offers</h1><p className="text-gray-600">Coming soon...</p></div></div>} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="seller/*" 
              element={
                <ProtectedRoute requiredRole="SELLER">
                  <Routes>
                    <Route index element={<SellerDashboard />} />
                    <Route path="dashboard" element={<SellerDashboard />} />
                    <Route path="listings" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-primary-900 mb-4">My Listings</h1><p className="text-gray-600">Coming soon...</p></div></div>} />
                    <Route path="offers" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-primary-900 mb-4">Received Offers</h1><p className="text-gray-600">Coming soon...</p></div></div>} />
                    <Route path="analytics" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-primary-900 mb-4">Analytics</h1><p className="text-gray-600">Coming soon...</p></div></div>} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Messages and Settings - Available to all authenticated users */}
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Static Pages */}
            <Route path="sell" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-2xl mx-auto px-4">
                  <h1 className="text-3xl font-bold text-primary-900 mb-4">Sell Your Startup</h1>
                  <p className="text-gray-600 mb-8">Ready to sell your startup? Join acquire.india and connect with verified buyers.</p>
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">Why Sell on acquire.india?</h3>
                      <ul className="text-left text-gray-600 space-y-2">
                        <li>• Access to verified buyers across India</li>
                        <li>• Secure escrow-protected transactions</li>
                        <li>• Professional valuation assistance</li>
                        <li>• Complete legal documentation support</li>
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/auth?mode=register" className="btn-primary">
                        Get Started as Seller
                      </Link>
                      <Link to="/create-listing" className="btn-secondary">
                        List Your Startup
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="buyer-guide" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Buyer Guide</h1>
                  <p className="text-gray-600">Complete guide for buyers on how to find and acquire startups</p>
                </div>
              </div>
            } />
            
            <Route path="seller-guide" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Seller Guide</h1>
                  <p className="text-gray-600">Complete guide for sellers on how to list and sell startups</p>
                </div>
              </div>
            } />
            
            <Route path="success-stories" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Success Stories</h1>
                  <p className="text-gray-600">Real stories from successful acquisitions on our platform</p>
                </div>
              </div>
            } />
            
            <Route path="faq" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Frequently Asked Questions</h1>
                  <p className="text-gray-600">Find answers to common questions about our platform</p>
                </div>
              </div>
            } />
            
            <Route path="sell" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Sell Your Startup</h1>
                  <p className="text-gray-600">Learn how to successfully sell your startup on AcquireIndia</p>
                </div>
              </div>
            } />
            
            <Route path="valuation" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Valuation Tools</h1>
                  <p className="text-gray-600">Tools and resources to help value your startup</p>
                </div>
              </div>
            } />
            
            <Route path="resources" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Resources</h1>
                  <p className="text-gray-600">Helpful resources for startup acquisition</p>
                </div>
              </div>
            } />
            
            <Route path="privacy" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Privacy Policy</h1>
                  <p className="text-gray-600">How we protect and handle your personal information</p>
                </div>
              </div>
            } />
            
            <Route path="terms" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Terms of Service</h1>
                  <p className="text-gray-600">Terms and conditions for using acquire.india</p>
                </div>
              </div>
            } />
            
            <Route path="cookies" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Cookie Policy</h1>
                  <p className="text-gray-600">How we use cookies to improve your experience</p>
                </div>
              </div>
            } />
            
            <Route path="disclaimer" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Disclaimer</h1>
                  <p className="text-gray-600">Important disclaimers about using our platform</p>
                </div>
              </div>
            } />
            
            <Route path="pricing" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Pricing</h1>
                  <p className="text-gray-600">Our pricing plans...</p>
                </div>
              </div>
            } />
            
            <Route path="contact" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-primary-900 mb-4">Contact Us</h1>
                  <p className="text-gray-600">Get in touch...</p>
                </div>
              </div>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-primary-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;