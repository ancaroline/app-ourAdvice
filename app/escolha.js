import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import  { useRouter }  from "expo-router";

const opcoes = ["Paz", "Amor", "Consolação", "Perdão", "Entendimento", "Compaixão", "Fraternidade"];

export default function Escolha() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>O que você deseja?</Text>
            <View style={styles.lista}>
                {opcoes.map((item, i) => (
                    <TouchableOpacity
                    key={i}
                    style={styles.botao}
                    onPress={() => router.push(`/conteudo/${item}`)}
                    activeOpacity = {0.7} // efeito visual ao tocar
                    >
                        <Text style={styles.botaotTexto}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    titulo: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
        marginBottom: 30
    },
    lista: {
        width: "100%",
    },
    botao: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2 // sombra para Android
    },
    botaoTexto: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
  }
});