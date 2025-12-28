import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTimer } from '../../api/timer';

export function useUpdateTimer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTimer,
    onSuccess: () => {
      // timer 쿼리 무효화하여 다음에 자동으로 refetch되도록
      queryClient.invalidateQueries({ queryKey: ['timer'] });
    },
  });
}
