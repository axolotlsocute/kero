import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7cb342",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { backgroundColor: "#1a1a2e" },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="feed" options={{ title: "Feed", tabBarIcon: ({ color }) => <Ionicons name="play-circle" size={24} color={color} /> }} />
      <Tabs.Screen name="quiz" options={{ title: "Quiz", tabBarIcon: ({ color }) => <Ionicons name="help-circle" size={24} color={color} /> }} />
      <Tabs.Screen name="streak" options={{ title: "Streak", tabBarIcon: ({ color }) => <Ionicons name="flame" size={24} color={color} /> }} />
      <Tabs.Screen name="battle" options={{ title: "Battle", tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} /> }} />
      <Tabs.Screen name="leaderboard" options={{ title: "Ranks", tabBarIcon: ({ color }) => <Ionicons name="podium" size={24} color={color} /> }} />
    </Tabs>
  );
}