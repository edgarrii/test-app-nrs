import { getStateDetails } from '@/api/StatesApi';
import { useQuery } from '@tanstack/react-query';

export function useStateDetails(detailUrl: string) {
  const { data, isLoading, isError, ...rest } = useQuery({
    queryKey: ['state-details', detailUrl],
    queryFn: () => getStateDetails(detailUrl),
  });

  return { stateDetails: data?.data ?? [], isLoading, isError, ...rest };
}
