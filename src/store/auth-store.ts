import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  // 액션
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,

        login: (accessToken, refreshToken) => {
          set({
            isLoggedIn: true,
            accessToken,
            refreshToken,
          });
        },

        logout: () => {
          set({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
          });
        },

        checkAuth: () => {
          const accessToken = localStorage.getItem('accessToken');
          const refreshToken = localStorage.getItem('refreshToken');

          if (accessToken && refreshToken) {
            set({
              isLoggedIn: true,
              accessToken,
              refreshToken,
            });
          } else {
            set({
              isLoggedIn: false,
              accessToken: null,
              refreshToken: null,
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      },
    ),
    { name: 'authStore' },
  ),
);

// 기존 helpers 유지
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useCheckAuth = () => useAuthStore((state) => state.checkAuth);
