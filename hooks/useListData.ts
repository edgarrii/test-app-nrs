import { useMemo } from 'react';
import { useStates } from './useStates';

export function useListData(search: string, highlightedStates: string[]) {
  const { states, isLoading, isError } = useStates();

  const originalData = useMemo(
    () => states.map((state) => ({ ...state, highlighted: highlightedStates.includes(state.state) })),
    [states, highlightedStates],
  );

  const modifiedData = useMemo(
    () => originalData.filter(({ state }) => state.toLowerCase().includes(search.toLowerCase().trim())),
    [originalData, search],
  );

  return { originalData, modifiedData, isLoading, isError };
}
