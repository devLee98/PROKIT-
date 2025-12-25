import { useQuery } from '@tanstack/react-query';
import { getTechStack } from '../../api/tech-stack';

export function useTechStackData(techStackSearch: string) {
  return useQuery({
    queryKey: ['tech-stack', techStackSearch],
    queryFn: () => getTechStack(techStackSearch),
    enabled: techStackSearch.length > 0,
  });
}
