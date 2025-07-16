import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';

interface StatesListItemProps {
  state: string;
  style?: ViewStyle;
  highlighted?: boolean;
  onDoublePress: () => void;
  onSinglePress: () => void;
}

export const StatesListItem = memo(
  ({ state, highlighted, style, onSinglePress, onDoublePress }: StatesListItemProps) => {
    const singleTap = useMemo(
      () =>
        Gesture.Tap()
          .maxDuration(250)
          .onStart(() => runOnJS(onSinglePress)()),
      [onSinglePress],
    );

    const doubleTap = useMemo(
      () =>
        Gesture.Tap()
          .maxDuration(250)
          .numberOfTaps(2)
          .onStart(() => runOnJS(onDoublePress)()),
      [onDoublePress],
    );

    return (
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <Animated.View style={[styles.wrapper, highlighted && styles.highlighted, style]}>
          <Text style={styles.text}>{state}</Text>
        </Animated.View>
      </GestureDetector>
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
