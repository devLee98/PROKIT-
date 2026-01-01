import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudyLog } from '../../api/study-logs';

export function useUpdateStudyLog(
  studyLogId: string,
  tasks: { content: string; isCompleted: boolean }[],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateStudyLog({ studyLogId, tasks }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['detail-study-log', studyLogId],
      });
    },
  });
}
