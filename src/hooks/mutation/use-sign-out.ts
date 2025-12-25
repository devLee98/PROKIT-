import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../api/auth';
import { useAuthStore } from '../../store/auth-store';

export function useSignOut() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      logout();
      navigate('/sign-in');
    },
  });
}
