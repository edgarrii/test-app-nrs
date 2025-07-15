import { useDoubleTap } from '@/hooks/useDoubleTap';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface StatesListItemProps {
  state: string;
  style?: ViewStyle;
  highlighted?: boolean;
  onDoublePress: () => void;
  onSinglePress: () => void;
}

export const StatesListItem = memo(
  ({ state, highlighted, style, onSinglePress, onDoublePress }: StatesListItemProps) => {
    const onPress = useDoubleTap(onDoublePress, onSinglePress);

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.wrapper, highlighted && styles.highlighted, style]}
        onPress={onPress}
      >
        <Text style={styles.text}>{state}</Text>
      </TouchableOpacity>
    );
  },
);

StatesListItem.displayName = 'StatesListItem';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    backgroundColor: '#ffbd76',
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  highlighted: {
    backgroundColor: '#d6832a',
  },
});
