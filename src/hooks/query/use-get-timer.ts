import { useQuery } from '@tanstack/react-query';
import { getTimer } from '../../api/timer';

export function useGetTimer() {
  return useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
    staleTime: Infinity,
    refetchOnMount: true,
  });
}
