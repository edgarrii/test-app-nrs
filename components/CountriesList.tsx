import { StateDetail } from '@/types/types';
import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { CountryListItem } from './CountryListItem';

interface CountriesListProps {
  data: StateDetail[];
  style?: ViewStyle;
}

export const CountriesList = memo(({ data, style }: CountriesListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: StateDetail }) => <CountryListItem county={item.county} population={item.population} />,
    [],
  );

  return (
    <FlatList
      scrollEnabled
      keyboardShouldPersistTaps="handled"
      style={[styles.wrapper, style]}
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      keyExtractor={(item, index) => item.county + item.population + index}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      renderItem={renderItem}
    />
  );
});

CountriesList.displayName = 'CountriesList';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  contentContainerStyle: {
    width: '100%',
  },
});
