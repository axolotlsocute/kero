import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { router } from "expo-router";

export default function FeedScreen() {
  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📚</Text>
      <Text style={styles.title}>Feed</Text>
      <Text style={styles.subtitle}>Swipeable lessons coming in Milestone 2</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", color: "#7cb342" },
  subtitle: { fontSize: 14, color: "#aaa", marginTop: 8 },
  logoutButton: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff5252",
  },
  logoutText: { color: "#ff5252", fontSize: 14 },
});