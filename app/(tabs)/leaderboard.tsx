import { View, Text, StyleSheet } from "react-native";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏆</Text>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>Rankings coming in Milestone 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a" },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", color: "#8bc34a" },
  subtitle: { fontSize: 14, color: "#aaa", marginTop: 8 },
});