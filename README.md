# acquire.india Frontend

A modern React frontend for the acquire.india marketplace - India's premier platform for buying and selling digital businesses.

## 🚀 Features

- **Modern Design**: Clean, professional UI with Indian-inspired color scheme
- **Responsive**: Mobile-first design that works on all devices
- **Authentication**: Complete auth system with role-based access
- **Real-time Ready**: WebSocket integration ready for live features
- **Performance**: Optimized with lazy loading and efficient state management
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Axios** - HTTP client with interceptors
- **Lucide Icons** - Beautiful SVG icons


## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`



## 🔐 Authentication

The app includes a complete authentication system with:

- **Login/Register** forms with validation
- **Role-based access** (Buyer, Seller, Admin)
- **Demo accounts** for testing
- **JWT token management**
- **Protected routes**

### Demo Accounts
- **Buyer**: Quick access to buyer features
- **Seller**: Access to seller dashboard and listing management




### Authentication
- Clean login/register forms
- Role selection
- Form validation
- Demo login options

## 🔧 API Integration



- **Axios interceptors** for auth tokens
- **Error handling** with user-friendly messages
- **Loading states** for better UX
- **API service layer** for organized requests

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    900: '#0A1F44', // Deep Blue
  },
  accent: {
    500: '#F57C00', // Saffron Orange
  },
}
```



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


- Issues: [GitHub Issues]

---

Built with ❤️ for the Indian startup ecosystem
