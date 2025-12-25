import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    combine(initialState, (set) => ({
      login: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        set({
          isLoggedIn: true,
          accessToken,
          refreshToken,
        });
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

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
    })),
    { name: 'authStore' },
  ),
);

export const useIsLoggedIn = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn;
};

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  return login;
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return logout;
};

export const useCheckAuth = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  return checkAuth;
};
