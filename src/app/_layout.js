import { Stack } from 'expo-router';
import { MedsProvider } from '../../context/MedsContext';

export default function RootLayout() {
  return (
    <MedsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="medicine" options={{ headerShown: false }} />
      </Stack>
    </MedsProvider>
  );
}