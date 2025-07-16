import { useStateDetails } from '@/hooks/useStateDetails';
import { State } from '@/types/types';
import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CountriesList } from './CountriesList';

interface ModalProps {
  state: State;
  onClose: () => void;
}

// There is a bug in reanimated that sometimes brings crash on Android if Animated component has entering animation
// https://github.com/software-mansion/react-native-reanimated/issues/7493#issuecomment-3056943474
// There is still no fix from reanimated team, so I made a solution with onLayout and useSharedValue

export const Modal = memo(({ state, onClose }: ModalProps) => {
  const animation = useSharedValue(0);

  const { stateDetails, isLoading, isError } = useStateDetails(state.detail);

  const totalPopulation = useMemo(() => stateDetails.reduce((acc, curr) => acc + curr.population, 0), [stateDetails]);

  const onModalClose = useCallback(() => {
    animation.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  }, [animation, onClose]);

  const onLayout = useCallback(() => {
    animation.value = withTiming(1, { duration: 300 });
  }, [animation]);

  const animatedStyles = useAnimatedStyle(() => ({ opacity: animation.value }));

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={onModalClose}>
        <Animated.View style={[styles.bg, animatedStyles]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.modal, animatedStyles]}>
        {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#b89881" />}
        {!isLoading && (
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

        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onModalClose}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

Modal.displayName = 'Modal';

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 5,
  },
  modal: {
    width: '80%',
    height: '60%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    zIndex: 10,
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
    fontSize: 18,
    color: 'red',
  },
  content: {
    flex: 1,
    rowGap: 2,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#b89881',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalPopulationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    columnGap: 4,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'lightgreen',
  },
});
