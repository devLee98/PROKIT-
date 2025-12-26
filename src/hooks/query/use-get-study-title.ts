import { useQuery } from '@tanstack/react-query';
import { getStudyTitle } from '../../api/study-logs';

export function useGetStudyTitle(isRunning: boolean) {
  return useQuery({
    queryKey: ['study-title'],
    queryFn: getStudyTitle,
    enabled: isRunning,
  });
}
