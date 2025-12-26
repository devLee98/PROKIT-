import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import { useErrorModalStore } from '../../store/error-modal-store';

export function useSignIn() {
  const navigate = useNavigate();
  const { showError } = useErrorModalStore();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // accessToken과 refreshToken을 localStorage에 저장
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      const targetPath = data.isFirstLogin === true ? '/profile-setting' : '/';
      navigate(targetPath, { replace: true });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
}
