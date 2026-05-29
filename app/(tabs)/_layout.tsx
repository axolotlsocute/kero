import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8bc34a",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { backgroundColor: "#111111", borderTopColor: "#222" },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="feed" options={{ title: "Feed", tabBarIcon: ({ color }) => <Ionicons name="play-circle" size={24} color={color} /> }} />
      <Tabs.Screen name="quiz" options={{ title: "Quiz", tabBarIcon: ({ color }) => <Ionicons name="help-circle" size={24} color={color} /> }} />
      <Tabs.Screen name="streak" options={{ title: "Streak", tabBarIcon: ({ color }) => <Ionicons name="flame" size={24} color={color} /> }} />
      <Tabs.Screen name="battle" options={{ title: "Battle", tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} /> }} />
      <Tabs.Screen name="leaderboard" options={{ title: "Ranks", tabBarIcon: ({ color }) => <Ionicons name="podium" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
    </Tabs>
  );
}