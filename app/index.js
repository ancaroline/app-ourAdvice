//Home
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { frases } from "../src/data/frases";
import { useRouter } from "expo-router";

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frases.length);
    }, 15000); // 15 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.frase}>{frases[index]}</Text>
      <TouchableOpacity style={styles.botao} onPress={() => router.push("/escolha")}>
        <Text style={styles.botaoTexto}>Iniciar</Text>
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
    backgroundColor: "#4A90E2",
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

