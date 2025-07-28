import { useStateDetails } from '@/hooks/useStateDetails';
import { State } from '@/types/types';
import React, { memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewProps } from 'react-native';
import { CountriesList } from './CountriesList';

interface StateDetailsProps extends ViewProps {
  state: State;
}

export const StateDetails = memo(({ state, style, ...props }: StateDetailsProps) => {
  const { stateDetails, isLoading, isError } = useStateDetails(state.detail);

  const totalPopulation = useMemo(() => stateDetails.reduce((acc, curr) => acc + curr.population, 0), [stateDetails]);

  return (
    <View style={[styles.wrapper, style]} {...props}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#b89881" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>{state.state}</Text>
          <Text style={styles.text}>Total Population: {state.population}</Text>
          <Text style={styles.text}>Number of Countries: {state.counties}</Text>
          {isError ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>Failed to load countries :(</Text>
            </View>
          ) : (
            <CountriesList data={stateDetails} style={styles.list} />
          )}
          {stateDetails.length > 0 && (
            <View style={styles.totalPopulationContainer}>
              <Text style={styles.text}>All countries population: {totalPopulation}</Text>
              {totalPopulation === state.population && <View style={styles.indicator} />}
            </View>
          )}
        </View>
      )}
    </View>
  );
});

StateDetails.displayName = 'StateDetails';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  loader: {
    flex: 1,
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
  },
  content: {
    flex: 1,
    rowGap: 4,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#b89881',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  list: {
    marginVertical: 4,
  },
  totalPopulationContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    columnGap: 4,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'lightgreen',
  },
});
