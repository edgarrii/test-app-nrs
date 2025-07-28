import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface StatesListItemProps {
  state: string;
  style?: ViewStyle;
  highlighted?: boolean;
  onDoublePress: () => void;
  onSinglePress: () => void;
}

export const StatesListItem = memo(
  ({ state, highlighted, style, onSinglePress, onDoublePress }: StatesListItemProps) => {
    const animatedOpacity = useSharedValue(1);

    const singleTap = useMemo(
      () =>
        Gesture.Tap()
          .maxDuration(250)
          .onTouchesDown(() => {
            animatedOpacity.value = withTiming(0.5, { duration: 50 });
          })
          .onFinalize(() => {
            animatedOpacity.value = withTiming(1, { duration: 50 });
          })
          .onStart(() => runOnJS(onSinglePress)()),
      [animatedOpacity, onSinglePress],
    );

    const doubleTap = useMemo(
      () =>
        Gesture.Tap()
          .maxDuration(250)
          .numberOfTaps(2)
          .onFinalize(() => {
            animatedOpacity.value = withTiming(1, { duration: 50 });
          })
          .onStart(() => runOnJS(onDoublePress)()),
      [animatedOpacity, onDoublePress],
    );

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: animatedOpacity.value,
    }));

    return (
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <Animated.View style={[styles.wrapper, highlighted && styles.highlighted, animatedStyle, style]}>
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
    paddingVertical: 8,
    paddingHorizontal: 4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  highlighted: {
    backgroundColor: '#d6832a',
  },
});
