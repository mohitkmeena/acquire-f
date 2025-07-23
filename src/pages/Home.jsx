import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  Building,
  Globe,
  Zap
} from 'lucide-react';
import useAppStore from '../store/appStore';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { initializeDemoData } = useAppStore();
  const { loginAsBuyer, loginAsSeller, loginAsAdmin } = useAuthStore();

  useEffect(() => {
    initializeDemoData();
  }, [initializeDemoData]);

  const stats = [
    { label: 'Active Listings', value: '500+', icon: Building },
    { label: 'Successful Deals', value: '150+', icon: CheckCircle },
    { label: 'Verified Users', value: '2000+', icon: Users },
    { label: 'Total Value', value: '₹50Cr+', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted transactions with escrow protection for both buyers and sellers.',
    },
    {
      icon: Users,
      title: 'Verified Community',
      description: 'All users undergo KYC verification ensuring a trusted marketplace environment.',
    },
    {
      icon: Globe,
      title: 'Pan-India Reach',
      description: 'Connect with startups and investors across all major Indian cities and regions.',
    },
    {
      icon: Zap,
      title: 'Quick Deals',
      description: 'Streamlined process from listing to closing, with average deal time of 30 days.',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Startup Founder',
      company: 'TechVenture',
      content: 'Sold my SaaS platform within 3 weeks. The process was smooth and transparent.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Priya Sharma',
      role: 'Angel Investor',
      company: 'Mumbai Angels',
      content: 'Found amazing investment opportunities. The verification process gives confidence.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Amit Patel',
      role: 'Serial Entrepreneur',
      company: 'Innovation Labs',
      content: 'Acquired two startups through AcquireIndia. Excellent platform for deal flow.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'List Your Startup',
      description: 'Create a detailed listing with financials, metrics, and growth potential.',
      icon: '📝',
    },
    {
      step: 2,
      title: 'Connect with Buyers',
      description: 'Verified buyers review your listing and submit offers through our platform.',
      icon: '🤝',
    },
    {
      step: 3,
      title: 'Secure Transaction',
      description: 'Complete the deal with our escrow service and legal documentation support.',
      icon: '✅',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg hero-pattern overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Buy & Sell Indian
                <span className="text-accent-500"> Startups</span>
                <br />Seamlessly
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-lg">
                India's premier marketplace connecting startup founders with verified buyers.
                Secure, transparent, and efficient deal-making platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/explore" className="btn-accent text-lg px-8 py-3 inline-flex items-center">
                  Explore Listings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/create-listing" className="btn-secondary text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  List Your Startup
                </Link>
              </div>

              {/* Demo Login Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={loginAsBuyer}
                 type="button"
                  className="text-sm px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                  Try as Buyer
                </button>
                <button
                  onClick={loginAsSeller}
                 type="button"
                  className="text-sm px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                  Try as Seller
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Quick Search</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search startups, SaaS, E-commerce..."
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option>All Categories</option>
                      <option>SaaS</option>
                      <option>E-commerce</option>
                      <option>Mobile App</option>
                    </select>
                    <select className="px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option>All Locations</option>
                      <option>Bangalore</option>
                      <option>Mumbai</option>
                      <option>Delhi</option>
                    </select>
                  </div>
                  <button className="w-full btn-accent">
                    Search Startups
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary-900" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and transparent process for buying and selling startups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6 text-2xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="flex items-center">
                      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                      <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Why Choose AcquireIndia?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for the Indian startup ecosystem with features that matter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from entrepreneurs and investors who found success on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-primary-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-accent-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs and investors who trust acquire.india
              for their startup transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn-accent text-lg px-8 py-3 inline-flex items-center">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/create-listing" className="btn-secondary text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                List Your Startup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;