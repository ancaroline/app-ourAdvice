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
    }, 60000); // Atualiza a cada 1 minuto
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
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  frase: { fontSize: 20, textAlign: "center", marginBottom: 40 },
  botao: { backgroundColor: "#4CAF50", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10 },
  botaoTexto: { color: "#fff", fontSize: 18 }
});

