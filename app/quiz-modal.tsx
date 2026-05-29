import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const questions = [
  {
    question: "What is the approximate value of pi (π)?",
    options: ["2.14159", "3.14159", "4.14159", "3.41592"],
    answer: 1,
  },
  {
    question: "What is the name of the line that cuts a circle exactly in half?",
    options: ["Radius", "Chord", "Diameter", "Tangent"],
    answer: 2,
  },
  {
    question: "Why is pi approximately 3.14?",
    options: [
      "It is the number of radii that fit around a circle",
      "It is the number of diameters that make up the circumference of a circle",
      "It is the ratio of a circle's area to its radius",
      "It is a randomly chosen constant"
    ],
    answer: 1,
  },
];

export default function QuizModal() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.scoreTitle}>Quiz Complete!</Text>
        <Text style={styles.scoreText}>{score} / {questions.length}</Text>
        <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
          <Text style={styles.doneButtonText}>Back to Feed</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question {current + 1} of {questions.length}</Text>
      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((option, index) => {
        let bg = "#1a1a1a";
        if (selected !== null) {
          if (index === q.answer) bg = "#4caf50";
          else if (index === selected) bg = "#f44336";
        }
        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, { backgroundColor: bg }]}
            onPress={() => handleSelect(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}

      {selected !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {current < questions.length - 1 ? "Next →" : "See Results"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, justifyContent: "center" },
  progress: { color: "#888", fontSize: 14, textAlign: "center", marginBottom: 8 },
  question: { color: "#fff", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  option: {
    padding: 16, borderRadius: 10, marginBottom: 10,
    borderWidth: 1, borderColor: "#333",
  },
  optionText: { color: "#fff", fontSize: 16 },
  nextButton: {
    backgroundColor: "#8bc34a", padding: 16,
    borderRadius: 10, alignItems: "center", marginTop: 16,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emoji: { fontSize: 48, textAlign: "center", marginBottom: 12 },
  scoreTitle: { color: "#fff", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  scoreText: { color: "#8bc34a", fontSize: 48, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  doneButton: {
    backgroundColor: "#8bc34a", padding: 16,
    borderRadius: 10, alignItems: "center", marginTop: 16,
  },
  doneButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});