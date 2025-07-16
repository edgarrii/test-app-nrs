import { queryClient } from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { sleep } from '@/utils/utils';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const onLayoutRootView = useCallback(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  useEffect(() => {
    sleep(1000).then(() => {
      setIsReady(true);
      NavigationBar.setButtonStyleAsync('light');
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar barStyle="light-content" backgroundColor="#b89881" />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
