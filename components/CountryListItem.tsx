import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CountryListItemProps {
  county: string;
  population: number;
}

export const CountryListItem = memo(({ county, population }: CountryListItemProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.content}>
        <Text style={styles.county}>{county}</Text>
        <Text style={styles.population}>{population}</Text>
      </View>
    </View>
  );
});

CountryListItem.displayName = 'CountryListItem';

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#b89881',
    width: '100%',
    paddingHorizontal: 2,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  county: {
    width: '50%',
    fontSize: 14,
    color: '#000',
  },
  population: {
    width: '50%',
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});