import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // UI State
  sidebarOpen: false,
  notifications: [],
  loading: false,
  
  // Listings State
  listings: [],
  filters: {
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    keyword: '',
  },
  sortBy: 'newest',
  currentPage: 1,
  totalPages: 1,

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setLoading: (loading) => set({ loading }),
  
  addNotification: (notification) => {
    const id = Date.now();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  
  setListings: (listings) => set({ listings }),
  
  setFilters: (filters) => set({ filters }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setTotalPages: (pages) => set({ totalPages: pages }),
  
  // Demo data
  initializeDemoData: () => {
    // TODO: Replace with actual API call
    // Example: const response = await publicAPI.getListings();
    // set({ listings: response.data });
    
    const demoListings = [
      {
        id: 1,
        title: 'SaaS Analytics Platform',
        description: 'AI-powered analytics platform for e-commerce businesses with 500+ active users.',
        revenue: 50000,
        askingPrice: 500000,
        category: 'SaaS',
        location: 'Bangalore',
        verified: true,
        seller: { name: 'Tech Entrepreneur', verified: true },
        tags: ['Analytics', 'AI', 'E-commerce'],
        createdAt: '2024-01-15',
      },
      {
        id: 2,
        title: 'Food Delivery Mobile App',
        description: 'Popular food delivery app serving 3 cities with strong user base and revenue growth.',
        revenue: 120000,
        askingPrice: 1200000,
        category: 'Mobile App',
        location: 'Mumbai',
        verified: true,
        seller: { name: 'Startup Founder', verified: true },
        tags: ['Food', 'Delivery', 'Mobile'],
        createdAt: '2024-01-10',
      },
      {
        id: 3,
        title: 'EdTech Learning Platform',
        description: 'Online learning platform with 10,000+ students and comprehensive course library.',
        revenue: 80000,
        askingPrice: 800000,
        category: 'EdTech',
        location: 'Delhi',
        verified: false,
        seller: { name: 'Education Expert', verified: true },
        tags: ['Education', 'Online Learning', 'Courses'],
        createdAt: '2024-01-05',
      },
      {
        id: 4,
        title: 'E-commerce Fashion Store',
        description: 'Trendy fashion e-commerce store with strong social media presence and loyal customers.',
        revenue: 200000,
        askingPrice: 1500000,
        category: 'E-commerce',
        location: 'Pune',
        verified: true,
        seller: { name: 'Fashion Entrepreneur', verified: true },
        tags: ['Fashion', 'E-commerce', 'Social Media'],
        createdAt: '2024-01-01',
      },
    ];
    
    set({ listings: demoListings });
  },
}));

export default useAppStore;