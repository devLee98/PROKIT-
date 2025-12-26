import { useMutation } from '@tanstack/react-query';
import { postTimer } from '../../api/timer';

export function usePostTimer() {
  return useMutation({
    mutationFn: postTimer,
  });
}
