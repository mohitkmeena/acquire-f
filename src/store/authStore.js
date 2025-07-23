import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem('token');
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Demo login functions
      loginAsBuyer: () => {
        const demoUser = {
          id: 1,
          name: 'Arjun Mehta',
          email: 'buyer@demo.com',
          role: 'BUYER',
          kycStatus: 'APPROVED',
          phone: '+91 98765 43210',
          company: 'TechVentures India',
          bio: 'Serial entrepreneur and angel investor looking for promising startups in the SaaS and EdTech space.',
        };
        get().login(demoUser, 'demo-buyer-token');
      },

      loginAsSeller: () => {
        const demoUser = {
          id: 2,
          name: 'Priya Sharma',
          email: 'seller@demo.com',
          role: 'SELLER',
          kycStatus: 'APPROVED',
          phone: '+91 87654 32109',
          company: 'InnovateTech Solutions',
          bio: 'Founder of multiple successful startups. Currently looking to exit my SaaS platform to focus on new ventures.',
        };
        get().login(demoUser, 'demo-seller-token');
      },

      loginAsAdmin: () => {
        // Admin demo removed - not needed for marketplace
        console.log('Admin demo not available');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;