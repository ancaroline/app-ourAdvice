import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import  { useRouter }  from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const opcoes = ["Paz", "Amor", "Perdão", "Consolação", "Entendimento", "Compaixão", "Fraternidade"];
const { width } = Dimensions.get("window");

export default function Escolha() {
    const router = useRouter();
    // Estado do menu lateral
    const [menuAberto, setMenuAberto] = useState(false);
    const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

    const toggleMenu = () => {
        if (menuAberto) {
            Animated.timing(slideAnim, {
                toValue: -width * 0.7,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setMenuAberto(false));
        } else {
            setMenuAberto(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <View style={styles.container}>

            {/* Ícone do menu */}
            <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* Conteúdo principal */}
            <Text style={styles.titulo}>O que você deseja?</Text>
            <View style={styles.lista}>
                {opcoes.map((item, i) => (
                    <TouchableOpacity
                    key={i}
                    style={styles.botao}
                    onPress={() => router.push(`/conteudo/${item}`)}
                    activeOpacity = {0.7} // efeito visual ao tocar
                    >
                        <Text style={styles.botaoTexto}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Menu */}
            {menuAberto && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleMenu}
                >
                    <Animated.View style={[styles.menu, { left: slideAnim }]} >
                        <Text style={styles.menuTitulo}>Menu</Text>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuTexto}>✨ Função 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuTexto}>📘 Função 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuTexto}>⚙️ Função 3</Text>
                        </TouchableOpacity>
                    </Animated.View>  
                </TouchableOpacity>
                    
            )}


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
        backgroundColor: "#8bc28dff",
        paddingVertical: 15,
        marginVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // sombra para Android,
        alignSelf: "center"
    },
    botaoTexto: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    menu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  menuTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuTexto: {
    fontSize: 16,
    color: "#444",
  },
  menuIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
});