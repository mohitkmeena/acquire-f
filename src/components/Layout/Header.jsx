import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, Settings, Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import NotificationDropdown from '../UI/NotificationDropdown';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navigation = [
    { name: 'Explore', href: '/explore' },
    { name: 'List Startup', href: '/create-listing', requiresAuth: true, role: 'SELLER' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
  ];

  const userNavigation = [
    { name: 'Dashboard', href: user?.role === 'SELLER' ? '/seller/dashboard' : '/buyer/dashboard', icon: User },
   ...(user?.role === 'BUYER' ? [{ name: 'Saved Listings', href: '/buyer/saved', icon: Heart }] : []),
   { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-900 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ai</span>
              </div>
              <span className="text-xl font-bold text-primary-900">acquire.india</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.requiresAuth && !isAuthenticated ? (
                  <Link
                    to="/auth"
                    className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ) : item.role && user?.role !== item.role ? (
                  <span className="text-sm font-medium text-gray-400 cursor-not-allowed">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-primary-900 border-b-2 border-primary-900'
                        : 'text-gray-600 hover:text-primary-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-900 font-medium text-sm">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block text-gray-700 font-medium">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            {user?.role}
                          </span>
                        </div>
                        
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.name}
                          </Link>
                        ))}
                        
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-900 hover:bg-gray-50 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.requiresAuth && !isAuthenticated ? (
                    <Link
                      to="/auth"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ) : item.role && user?.role !== item.role ? (
                    <span className="block px-3 py-2 text-base font-medium text-gray-400 cursor-not-allowed rounded-lg">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block mt-2 btn-primary text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;