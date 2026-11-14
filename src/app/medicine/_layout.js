import { Stack } from 'expo-router';
export default function MedicineLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ title: 'Medicine Details' }} />
    </Stack>
  );
}