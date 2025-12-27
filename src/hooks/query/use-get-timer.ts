import { useQuery } from '@tanstack/react-query';
import { getTimer } from '../../api/timer';

export function useGetTimer(enabled: boolean) {
  return useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
    enabled,
  });
}
