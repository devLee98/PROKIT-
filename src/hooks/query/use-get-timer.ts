import { useQuery } from '@tanstack/react-query';
import { getTimer } from '../../api/timer';

export function useGetTimer(hasStarted: boolean) {
  return useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
    enabled: hasStarted,
    staleTime: Infinity,
    refetchOnMount: true,
  });
}
