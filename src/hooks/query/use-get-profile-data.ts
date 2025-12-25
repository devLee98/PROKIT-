import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/profile';

export function useGetProfileData() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}
