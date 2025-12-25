import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsLoggedIn } from '../store/auth-store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
    return <Navigate to="/sign-in" replace />;
  }

  // 로그인 되어 있으면 페이지 표시
  return children;
}
