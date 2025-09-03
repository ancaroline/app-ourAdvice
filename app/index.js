//Home
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { frases } from "../src/data/frases";
import { useRouter } from "expo-router";

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current; // opacidade inicial
  const scaleAnim = useRef(new Animated.Value(1)).current; // scale inicial

  useEffect(() => {
    const timer = setInterval(() => {
      // animação de saída
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // atualiza frase
        setIndex((prev) => (prev + 1) % frases.length);

        // animação de entrada
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 15000); // muda a cada 15s

    return () => clearInterval(timer);
  }, []);

return (
  <View style={styles.container}>
    <View style={styles.fraseBox}>
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      >
        <Text style={styles.aspasp}>“</Text>
        <Text style={styles.frase}>{frases[index]}</Text>
        <Text style={styles.aspasp}>”</Text>
      </Animated.View>
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/escolha")}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Iniciar</Text>
    </TouchableOpacity>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  fraseBox: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
    aspasp: {
    fontSize: 50, // maior que o texto
    color: "#ccc",
    textAlign: "center",
    lineHeight: 50,
  },
  frase: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "#28b1d3ff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});

