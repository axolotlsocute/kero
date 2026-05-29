import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || "KeroLearner");
        setPhotoURL(user.photoURL || null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSaveName = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      setEditing(false);
      Alert.alert("Saved", "Display name updated!");
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoURL(uri);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: uri });
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PROFILE</Text>
      <Text style={styles.subheader}>Track your progress.</Text>

      <TouchableOpacity onPress={handlePickImage}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>🐸</Text>
          </View>
        )}
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {editing ? (
        <View style={styles.nameRow}>
          <TextInput
            style={styles.nameInput}
            value={displayName}
            onChangeText={setDisplayName}
            autoFocus
          />
          <TouchableOpacity onPress={handleSaveName}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={styles.displayName}>{displayName} ✏️</Text>
        </TouchableOpacity>
      )}

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>⚡</Text>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🎯</Text>
          <Text style={styles.statNumber}>0%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Lessons</Text>
        <Text style={styles.placeholder}>No saved lessons yet — coming in Milestone 2</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#0a0a0a", paddingTop: 60, paddingHorizontal: 24 },
  header: { fontSize: 20, fontWeight: "bold", color: "#8bc34a", letterSpacing: 2 },
  subheader: { fontSize: 14, color: "#aaa", marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#8bc34a" },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#1a1a1a", justifyContent: "center", alignItems: "center",
    borderWidth: 2, borderColor: "#8bc34a",
  },
  avatarText: { fontSize: 40 },
  changePhoto: { color: "#8bc34a", fontSize: 12, textAlign: "center", marginTop: 6 },
  displayName: { fontSize: 22, color: "#fff", fontWeight: "bold", marginTop: 12 },
  nameRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 },
  nameInput: {
    backgroundColor: "#1a1a1a", color: "#fff", padding: 10,
    borderRadius: 8, fontSize: 18, minWidth: 150, borderWidth: 1, borderColor: "#333",
  },
  saveButton: { color: "#8bc34a", fontSize: 16, fontWeight: "bold" },
  statsRow: {
    flexDirection: "row", justifyContent: "space-around",
    width: "100%", marginTop: 24, backgroundColor: "#111",
    borderRadius: 12, padding: 16,
  },
  statBox: { alignItems: "center" },
  statEmoji: { fontSize: 20 },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 4 },
  statLabel: { fontSize: 11, color: "#888", marginTop: 2 },
  section: { width: "100%", marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  placeholder: { color: "#555", fontSize: 13 },
  logoutButton: {
    marginTop: "auto", marginBottom: 32,
    paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: 8, borderWidth: 1, borderColor: "#ff5252", width: "100%", alignItems: "center",
  },
  logoutText: { color: "#ff5252", fontSize: 15 },
});