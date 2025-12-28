import { useMutation } from '@tanstack/react-query';
import { deleteTimer } from '../../api/timer';

export function useDeleteTimer() {
  return useMutation({
    mutationFn: deleteTimer,
  });
}
