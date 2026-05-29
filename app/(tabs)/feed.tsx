import { useFocusEffect } from "@react-navigation/native";
import { useEvent } from "expo";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const { width } = Dimensions.get("window");

const videoSource = require("../../assets/videos/model_video.mp4");

export default function FeedScreen() {
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  // Pause when leaving tab, play when returning
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        try { player.play(); } catch (e) {}
      }, 100);
      return () => {
        clearTimeout(timeout);
        try { player.pause(); } catch (e) {}
      };
    }, [player])
  );

  // Poll for progress updates
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        try {
          setProgress(player.currentTime * 1000);
          setDuration(player.duration * 1000 || 1);
        } catch (e) {}
      }, 250);
      return () => clearInterval(interval);
    }, [player])
  );

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleSeek = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    const seekSeconds = (touchX / width) * (duration / 1000);
    player.currentTime = seekSeconds;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePlay}>
        <View style={styles.videoWrapper}>
          <VideoView
            player={player}
            style={styles.video}
            nativeControls={false}
            contentFit="contain"
          />

          {!isPlaying && (
            <View style={styles.pauseOverlay}>
              <Text style={styles.pauseIcon}>▶</Text>
            </View>
          )}

          <View style={styles.overlay}>
            <Text style={styles.title}>Pi Explained</Text>
            <Text style={styles.subtitle}>Math · Geometry</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={styles.seekBarContainer}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={(e) => {
          player.pause();
          const touchX = e.nativeEvent.locationX;
          const seekSeconds = (touchX / width) * (duration / 1000);
          player.currentTime = seekSeconds;
          setProgress(seekSeconds * 1000);
        }}
        onResponderMove={(e) => {
          const touchX = Math.max(0, Math.min(e.nativeEvent.locationX, width));
          const seekSeconds = (touchX / width) * (duration / 1000);
          player.currentTime = seekSeconds;
          setProgress(seekSeconds * 1000);
        }}
        onResponderRelease={() => {
          player.play();
        }}
      >
        <View style={[styles.seekBarFill, { width: `${(progress / duration) * 100}%` }]} />
        <View style={[styles.seekDot, { left: `${(progress / duration) * 100}%` }]} />
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push("/quiz-modal")}
      >
        <Text style={styles.quizButtonText}>🧠 Take Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  videoWrapper: { flex: 1 },
  video: { flex: 1 },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  pauseIcon: { fontSize: 48, color: "#fff" },
  overlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  subtitle: { color: "#aaa", fontSize: 13, marginTop: 2 },
  seekBarContainer: {
    height: 20,
    backgroundColor: "#333",
    width: "100%",
    justifyContent: "center",
  },
  seekBarFill: {
    height: 3,
    backgroundColor: "#8bc34a",
    position: "absolute",
  },
  seekDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8bc34a",
    marginLeft: -6,
  },
  quizButton: {
    backgroundColor: "#8bc34a",
    paddingVertical: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  quizButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});