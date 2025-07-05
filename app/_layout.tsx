import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Name Jam" }} />
      <Stack.Screen
        name="create-game"
        options={{ title: "Create Game", presentation: "modal" }}
      />
    </Stack>
  );
}
