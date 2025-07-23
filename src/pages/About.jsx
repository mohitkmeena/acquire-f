import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Globe, TrendingUp, Shield, Lightbulb, HeartHandshake as Handshake, Star, ArrowRight } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize the security of every transaction and maintain the highest standards of trust in our marketplace.'
    },
    {
      icon: Handshake,
      title: 'Transparency',
      description: 'Complete transparency in all dealings, from listing details to transaction processes.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously innovating to provide the best platform for startup acquisitions in India.'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Building a supportive community where entrepreneurs and investors can thrive together.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 15+ years in the Indian startup ecosystem. Previously founded two successful startups.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      linkedin: '#'
    },
    {
      name: 'Priya Sharma',
      role: 'Co-Founder & CTO',
      bio: 'Former tech lead at major Indian unicorns. Expert in building scalable platforms and secure systems.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      linkedin: '#'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Business Development',
      bio: 'Investment banking background with deep connections in the Indian startup and investor community.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      linkedin: '#'
    },
    {
      name: 'Sneha Reddy',
      role: 'Head of Operations',
      bio: 'Operations expert who ensures smooth transactions and exceptional user experience on our platform.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      linkedin: '#'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Founded',
      description: 'acquire.india was founded with a vision to democratize startup acquisitions in India.'
    },
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Launched our MVP with 50+ verified startups and completed our first successful acquisition.'
    },
    {
      year: '2024',
      title: 'Major Growth',
      description: 'Reached 500+ listings, 2000+ users, and facilitated ₹50Cr+ in transactions.'
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Raised Series A funding to expand across India and enhance platform capabilities.'
    }
  ];

  const stats = [
    { label: 'Startups Listed', value: '500+', icon: TrendingUp },
    { label: 'Successful Deals', value: '150+', icon: Handshake },
    { label: 'Registered Users', value: '2000+', icon: Users },
    { label: 'Cities Covered', value: '25+', icon: Globe }
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
              About acquire.india
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Empowering India's startup ecosystem by connecting visionary entrepreneurs 
              with strategic buyers in a secure, transparent marketplace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary-900 mr-4" />
                  <h2 className="text-3xl font-bold text-primary-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To democratize startup acquisitions in India by providing a secure, 
                  transparent, and efficient platform that connects entrepreneurs with 
                  the right buyers, enabling successful exits and fostering innovation.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-accent-500 mr-4" />
                  <h2 className="text-3xl font-bold text-primary-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become India's most trusted marketplace for startup acquisitions, 
                  where every entrepreneur can find the perfect buyer and every investor 
                  can discover exceptional opportunities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-3">
                        <stat.icon className="w-6 h-6 text-primary-900" />
                      </div>
                      <div className="text-2xl font-bold text-primary-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <value.icon className="w-6 h-6 text-primary-900" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals passionate about the Indian startup ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-primary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-accent-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-primary-900 hover:text-primary-700 transition-colors duration-200"
                >
                  Connect on LinkedIn
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in building India's premier startup acquisition platform
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center relative z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="ml-6 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-accent-600 bg-accent-100 px-2 py-1 rounded">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Be part of India's startup revolution. Whether you're looking to buy or sell,
              we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth?mode=register" className="btn-accent text-lg px-8 py-3 inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/contact" className="btn-secondary text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;