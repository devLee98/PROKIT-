import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTimer } from '../../api/timer';

export function useDeleteTimer(studyLogId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimer,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['timer'] });
      queryClient.removeQueries({ queryKey: ['detail-study-log', studyLogId] });
    },
  });
}
