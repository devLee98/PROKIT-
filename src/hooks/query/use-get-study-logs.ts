import { useQuery } from '@tanstack/react-query';
import { getStudyLogs } from '../../api/study-logs';

export function useGetStudyLogs(isRunning: boolean) {
  return useQuery({
    queryKey: ['study-logs'],
    queryFn: getStudyLogs,
    enabled: isRunning,
  });
}
