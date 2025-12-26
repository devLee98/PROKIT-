import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/profile';
import { useIsLoggedIn } from '../../store/auth-store';

export function useGetProfileData() {
  const isLoggedIn = useIsLoggedIn();
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isLoggedIn, //로그인 상태일 때만 프로필 데이터 조회
  });
}
