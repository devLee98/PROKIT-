import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postProfile } from '../../api/post-profile';
import type { ProfileSettingFormData } from '../../types/profile';

export function usePostProfile() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ProfileSettingFormData) => postProfile(data),
    onSuccess: () => {
      navigate('/');
    },
  });
}
