import { View, Text, StyleSheet } from "react-native";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚔️</Text>
      <Text style={styles.title}>Battle</Text>
      <Text style={styles.subtitle}>1v1 ghost battles coming in Milestone 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", color: "#7cb342" },
  subtitle: { fontSize: 14, color: "#aaa", marginTop: 8 },
});