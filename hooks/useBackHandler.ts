import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackHandler = (action: () => void) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      action();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [action]);
};
