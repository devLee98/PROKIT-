import { useMutation } from '@tanstack/react-query';
import { updateTimer } from '../../api/timer';

export function useUpdateTimer() {
  return useMutation({
    mutationFn: updateTimer,
  });
}
