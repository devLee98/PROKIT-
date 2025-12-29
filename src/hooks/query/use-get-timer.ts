import { useQuery } from '@tanstack/react-query';
import { getTimer } from '../../api/timer';

export function useGetTimer(isRunning: boolean) {
  return useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
    enabled: isRunning,
    staleTime: 0,
    refetchOnMount: true,
  });
}
