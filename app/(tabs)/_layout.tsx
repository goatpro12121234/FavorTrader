// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="auth/PhoneSignIn">
      <Stack.Screen name="auth/PhoneSignIn" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/explore" options={{ headerShown: false }} />
      {/* Add other screens as needed */}
    </Stack>
  );
}
