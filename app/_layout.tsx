import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="quiz-modal"
        options={{ presentation: "modal", headerShown: true, headerTitle: "Quiz", headerStyle: { backgroundColor: "#0a0a0a" }, headerTintColor: "#8bc34a" }}
      />
    </Stack>
  );
}