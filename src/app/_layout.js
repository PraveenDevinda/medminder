import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { MedsProvider } from '../../context/MedsContext';
import { setupNotifications } from '../../utils/notifications';

export default function RootLayout() {
  useEffect(() => {
    setupNotifications();
  }, []);
  return (
    <MedsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="medicine" options={{ headerShown: false }} />
      </Stack>
    </MedsProvider>
  );
}