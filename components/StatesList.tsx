import { State, StateListItem } from '@/types/types';
import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { StatesListItem } from './StatesListItem';

interface StatesListProps {
  data: StateListItem[];
  style?: ViewStyle;
  onItemSinglePress: (state: State) => void;
  onItemDoublePress: (state: string) => void;
}

export const StatesList = memo(({ style, data, onItemSinglePress, onItemDoublePress }: StatesListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: StateListItem }) => (
      <StatesListItem
        state={item.state}
        highlighted={item.highlighted}
        onSinglePress={() => onItemSinglePress(item)}
        onDoublePress={() => onItemDoublePress(item.state)}
      />
    ),
    [onItemSinglePress, onItemDoublePress],
  );

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      style={[styles.wrapper, style]}
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      keyExtractor={(item, index) => item.state + index}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      renderItem={renderItem}
    />
  );
});

StatesList.displayName = 'StatesList';

const styles = StyleSheet.create({
  wrapper: {},
  contentContainerStyle: {
    paddingVertical: 20,
    paddingHorizontal: 2,
    rowGap: 12,
  },
});
