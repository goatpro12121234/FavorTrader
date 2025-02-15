import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoading(false);

      if (!authUser) {
        router.replace('/auth/PhoneSignIn'); // ✅ Redirect to login screen if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen
          name="auth/PhoneSignIn"
          options={{ headerShown: false }}
        />
      )}
    </Stack>
  );
}
