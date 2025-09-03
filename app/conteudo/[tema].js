//página dinâmica para cada tema
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { conteudo } from "../../src/data/versiculos";

export default function Conteudo() {
  const { tema } = useLocalSearchParams();
  const data = conteudo[tema] || { versiculos: [], conselhos: [] };

  const [indexVers, setIndexVers] = useState(0);
  const [indexCons, setIndexCons] = useState(0);
  // Funções de navegação para versículos
  const proximoVers = () =>
    setIndexVers((prev) => (prev + 1) % data.versiculos.length);
  const anteriorVers = () =>
    setIndexVers((prev) =>
        prev === 0 ? data.versiculos.length - 1 : prev - 1
    );
  // Funções de navegação para conselhos
  const proximoCons = () =>
    setIndexCons((prev) => (prev + 1) % data.conselhos.length);
  const anteriorCons = () =>
    setIndexCons((prev) =>
        prev === 0 ? data.conselhos.length - 1 : prev - 1
    );


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>{tema}</Text>

        {/* Versículo */}
        {data.versiculos.length > 0 ? (
          <>
            <Text style={styles.texto}>{data.versiculos[indexVers]}</Text>
            
            <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botao} onPress={anteriorVers}>
                    <Text style={styles.botaoTexto}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={proximoVers}>
                    <Text style={styles.botaoTexto}>Próximo</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.indicador}>
                {indexVers + 1} de {data.versiculos.length}
            </Text>
          </>
        ) : (
          <Text style={styles.alerta}>Nenhum versículo disponível.</Text>
        )}

        {/* Conselho */}
        {data.conselhos.length > 0 ? (
          <>
            <Text style={[styles.texto, { marginTop: 30 }]}>
              {data.conselhos[indexCons]}
            </Text>

            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoSecundario]}
                onPress={anteriorCons}
              >
                <Text style={styles.botaoTexto}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoSecundario]}
                onPress={proximoCons}
              >
                <Text style={styles.botaoTexto}>Próximo</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.indicador}>
              {indexCons + 1} de {data.conselhos.length}
            </Text>
          </>
        ) : (
          <Text style={styles.alerta}>Nenhum conselho disponível.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
    textAlign: "center"
  },
  texto: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },

  botao: {
    backgroundColor: "#6ba86dff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  botaoSecundario: {
    backgroundColor: "#28b1d3ff"
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
  alerta: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20
  },
    indicador: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
