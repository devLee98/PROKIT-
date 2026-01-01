import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stopTimer } from '../../api/timer';

export function useStopTimer({
  timerId,
  splitTimes,
  review,
  tasks,
  studyLogId,
  onComplete,
}: {
  timerId: string;
  splitTimes: { date: string; timeSpent: number }[];
  review: string;
  tasks: { content: string; isCompleted: boolean }[];
  studyLogId: string;
  onComplete: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => stopTimer({ timerId, splitTimes, review, tasks }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['timer'] });
      queryClient.removeQueries({ queryKey: ['detail-study-log', studyLogId] });
      onComplete();
    },
  });
}
