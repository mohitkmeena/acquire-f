import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Info,
  ArrowLeft,
  Circle
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Messages = () => {
  const { user } = useAuthStore();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [conversations] = useState([
    {
      id: 1,
      participant: {
        name: 'Rajesh Kumar',
        role: 'Seller',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: true
      },
      listingTitle: 'SaaS Analytics Platform',
      lastMessage: 'Thanks for your interest! I\'d be happy to discuss the details.',
      lastMessageTime: '2024-01-18T10:30:00Z',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          senderId: user?.id,
          content: 'Hi, I\'m interested in your SaaS platform. Can we discuss the details?',
          timestamp: '2024-01-18T09:15:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: 2,
          content: 'Hello! Thanks for your interest. I\'d be happy to discuss the details.',
          timestamp: '2024-01-18T09:30:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 2,
          content: 'The platform has been growing steadily with 500+ active users and ₹50k monthly revenue.',
          timestamp: '2024-01-18T10:30:00Z',
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Priya Sharma',
        role: 'Buyer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: false
      },
      listingTitle: 'E-commerce Fashion Store',
      lastMessage: 'I\'ve submitted an offer. Please review when you get a chance.',
      lastMessageTime: '2024-01-17T16:45:00Z',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          senderId: 3,
          content: 'Hi, I\'m interested in acquiring your fashion store.',
          timestamp: '2024-01-17T15:00:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: user?.id,
          content: 'Great! I\'d love to discuss this with you. What specific aspects are you most interested in?',
          timestamp: '2024-01-17T15:30:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 3,
          content: 'I\'ve submitted an offer. Please review when you get a chance.',
          timestamp: '2024-01-17T16:45:00Z',
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Amit Patel',
        role: 'Seller',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: true
      },
      listingTitle: 'Mobile Food Delivery App',
      lastMessage: 'The app has great potential in tier-2 cities.',
      lastMessageTime: '2024-01-16T14:20:00Z',
      unreadCount: 1,
      messages: [
        {
          id: 1,
          senderId: user?.id,
          content: 'Your food delivery app looks interesting. What\'s the current user base?',
          timestamp: '2024-01-16T13:00:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: 4,
          content: 'We have about 5,000 active users across 3 cities.',
          timestamp: '2024-01-16T13:30:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 4,
          content: 'The app has great potential in tier-2 cities.',
          timestamp: '2024-01-16T14:20:00Z',
          type: 'text'
        }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.listingTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    
    // In a real app, this would send the message to the server
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-screen">
          {/* Conversations List */}
          <div className={`w-full md:w-1/3 bg-white border-r border-gray-200 ${selectedChat ? 'hidden md:block' : ''}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-primary-900">Messages</h1>
                {totalUnreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {totalUnreadCount}
                  </span>
                )}
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-full pb-20">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => setSelectedChat(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                      selectedChat?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </p>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-1">
                          {conversation.listingTitle}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary-900 text-white text-xs rounded-full px-2 py-1 ml-2">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : ''}`}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedChat(null)}
                        className="md:hidden p-2 text-gray-600 hover:text-primary-900"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      
                      <div className="relative">
                        <img
                          src={selectedChat.participant.avatar}
                          alt={selectedChat.participant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedChat.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {selectedChat.participant.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedChat.listingTitle}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary-900 rounded-lg hover:bg-gray-100">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-primary-900 rounded-lg hover:bg-gray-100">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-primary-900 rounded-lg hover:bg-gray-100">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === user?.id
                            ? 'bg-primary-900 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === user?.id ? 'text-primary-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="p-2 text-gray-600 hover:text-primary-900 rounded-lg hover:bg-gray-100"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Circle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;