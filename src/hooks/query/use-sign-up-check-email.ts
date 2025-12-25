import { useQuery } from '@tanstack/react-query';
import { checkEmail } from '../../api/sign-up';

export function useSignUpCheckEmail(email: string) {
  return useQuery({
    queryKey: ['signUpCheckEmail', email],
    queryFn: async () => checkEmail({ email }),
    enabled: false, // 자동 실행 비활성화
  });
}
