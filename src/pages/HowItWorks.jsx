import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Search, MessageCircle, HeartHandshake as HandShake, Shield, CheckCircle, ArrowRight, Clock, Users, TrendingUp, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Sign Up & Get Verified',
      description: 'Create your account and complete KYC verification to join our trusted community.',
      icon: UserPlus,
      details: [
        'Quick registration process',
        'KYC verification for security',
        'Choose your role (Buyer/Seller)',
        'Profile setup and preferences'
      ],
      color: 'blue'
    },
    {
      id: 2,
      title: 'List or Browse Startups',
      description: 'Sellers create detailed listings while buyers explore verified opportunities.',
      icon: FileText,
      details: [
        'Comprehensive business profiles',
        'Financial metrics and analytics',
        'Upload supporting documents',
        'Advanced search and filters'
      ],
      color: 'green'
    },
    {
      id: 3,
      title: 'Connect & Negotiate',
      description: 'Engage with potential partners through our secure messaging platform.',
      icon: MessageCircle,
      details: [
        'Direct messaging system',
        'Share additional information',
        'Schedule video calls',
        'Negotiate terms and pricing'
      ],
      color: 'purple'
    },
    {
      id: 4,
      title: 'Secure Transaction',
      description: 'Complete your deal with our escrow service and legal documentation support.',
      icon: HandShake,
      details: [
        'Escrow protection service',
        'Legal documentation assistance',
        'Payment processing',
        'Asset transfer support'
      ],
      color: 'orange'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'All users are KYC verified and transactions are protected by escrow services.'
    },
    {
      icon: Clock,
      title: 'Fast Process',
      description: 'Average deal completion time of 30 days with streamlined workflows.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated support team to guide you through every step of the process.'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Access to market data, valuation tools, and industry benchmarks.'
    }
  ];

  const stats = [
    { label: 'Average Deal Time', value: '30 Days', icon: Clock },
    { label: 'Success Rate', value: '85%', icon: CheckCircle },
    { label: 'User Satisfaction', value: '4.8/5', icon: Award },
    { label: 'Verified Users', value: '2000+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg hero-pattern py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How acquire.india Works
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              A simple, secure, and transparent process for buying and selling Indian startups
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From registration to deal completion, we've streamlined every step
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${step.color}-100 flex items-center justify-center mr-4`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                    </div>
                    <div className="text-sm font-medium text-gray-500">Step {step.id}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <div className={`w-64 h-64 rounded-2xl bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 flex items-center justify-center`}>
                    <step.icon className={`w-24 h-24 text-${step.color}-600`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with security, efficiency, and user experience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-primary-900" />
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Platform Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs and investors who trust acquire.india
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth?mode=register" className="btn-accent text-lg px-8 py-3 inline-flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/explore" className="btn-secondary text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Explore Listings
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;