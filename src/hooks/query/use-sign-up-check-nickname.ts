import { useQuery } from '@tanstack/react-query';
import { checkNickname } from '../../api/sign-up';

export function useSignUpCheckNickname(nickname: string) {
  return useQuery({
    queryKey: ['sign-up-check-nickname', nickname],
    queryFn: async () => checkNickname({ nickname }),
    enabled: false,
  });
}
