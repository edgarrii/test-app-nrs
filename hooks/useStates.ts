import { getStates } from '@/api/StatesApi';
import { useQuery } from '@tanstack/react-query';

export function useStates() {
  const { data, isLoading, isError, ...rest } = useQuery({
    queryKey: ['states'],
    queryFn: () => getStates(),
  });

  return { states: data?.data ?? [], isLoading, isError, ...rest };
}
