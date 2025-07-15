import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CountryListItemProps {
  county: string;
  population: number;
}

export const CountryListItem = memo(({ county, population }: CountryListItemProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.county}>{county}</Text>
      <Text style={styles.population}>{population}</Text>
    </View>
  );
});

CountryListItem.displayName = 'CountryListItem';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  county: {
    fontSize: 14,
    color: '#000',
  },
  population: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});