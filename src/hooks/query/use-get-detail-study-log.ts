import { useQuery } from '@tanstack/react-query';
import { getDetailStudyLog } from '../../api/study-logs';

export function useGetDetailStudyLog(studyLogId: string, isRunning: boolean) {
  return useQuery({
    queryKey: ['detail-study-log', studyLogId],
    queryFn: () => getDetailStudyLog(studyLogId),
    enabled: isRunning && !!studyLogId,
  });
}
