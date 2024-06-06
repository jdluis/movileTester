import { Stack } from 'expo-router';

export default function IntruderLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="gallery" />
    </Stack>
  );
}
