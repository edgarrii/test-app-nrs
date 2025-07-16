import { queryClient } from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
    NavigationBar.setBackgroundColorAsync('#b89881');
  }, []);

  const onLayoutRootView = useCallback(() => {
    SplashScreen.hide();
  }, []);

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
