import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Pressable } from "react-native";
import  { useRouter }  from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const opcoes = ["Paz", "Amor", "Perdão", "Consolação", "Entendimento", "Compaixão", "Fraternidade"];
const { width } = Dimensions.get("window");


// Card isolado
function Card({ title, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(() => onPress && onPress());
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#e8b7f0"],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.opcaoCard,
          { transform: [{ scale: scaleAnim }], backgroundColor },
        ]}
      >
        <Text style={styles.opcaoTexto}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}
export default function Escolha() {
    const router = useRouter();
    // Estado do menu lateral
    const [menuAberto, setMenuAberto] = useState(false);

    // Animações
    const menuAnim = useRef(new Animated.Value(-width * 0.7)).current; // menu lateral  
    const iconAnim = useRef(new Animated.Value(0)).current; // ícone animação
    const fadeAnim = useRef(new Animated.Value(0)).current; // fade das opções do menu


    const toggleMenu = () => {
        if (menuAberto) {
            // Fecha o menu
            Animated.parallel([
                Animated.timing(menuAnim, {
                    toValue: -width * 0.7, // volta para fora da tela
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(iconAnim, {
                    toValue: 0, // volta ao estado inicial do ícone
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => setMenuAberto(false));
        } else {
            // Abre o menu
            setMenuAberto(true);
            Animated.parallel([
                Animated.timing(menuAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(iconAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                // Fade das opções
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            })
        }
    };

    return (
        <View style={styles.container}>

            {/* Ícone do menu animado */}
            <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
                {/*Linha 1 */}
                <Animated.View
                    style={[
                        styles.linha,
                        {
                            transform: [
                                {
                                    rotateZ: iconAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "45deg"],
                                    }),
                                },
                                {
                                    translateY: iconAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 15],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
                {/* Linha 2 */}
                <Animated.View
                    style={[
                        styles.linha,
                        {
                            opacity: iconAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            }),
                        },
                    ]}
                />
                {/* Linha 3 */}
                <Animated.View
                    style={[
                        styles.linha,
                        {
                            transform: [
                                {
                                    rotateZ: iconAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "-45deg"],
                                    }),
                                },
                                {
                                    translateY: iconAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -15],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </TouchableOpacity>
            
                            {/* Conteúdo principal */}
            {/* Título */}
            <Text style={styles.titulo}>O que você deseja?</Text>
            
            {/* Lista de opções */}
            <View style={styles.lista}>
                {opcoes.map((item, i) => (
                    <Card
                        key={i}
                        title={item}
                        onPress={() => router.push(`/conteudo/${item}`)}
                    />
                ))}
            </View>

            {/* Menu */}
            {menuAberto && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleMenu}
                >
                    <Animated.View style={[styles.menu, { left: menuAnim }]} >
                        <Text style={styles.menuTitulo}>OurAdvice</Text>

                        <Animated.View style={{ opacity: fadeAnim }}>
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={styles.menuTexto}>✨ Favoritos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={styles.menuTexto}>📘 Livros</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={styles.menuTexto}>⚙️ Configurações</Text>
                            </TouchableOpacity>
                        </Animated.View>

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
        width: "95%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 20,
    },
    
    opcaoCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        width: "48%", // dois por linha
        minHeight: 130, // garante um tamanho mínimo
        justifyContent: "center",
        alignItems: "center",
    },
    opcaoTexto: {
        color: "#333",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        // removi flexShrink e flexWrap
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
    backgroundColor: "#6f8f7bff",
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
    color: "#f0f0f0",
    marginBottom: 30,
    marginTop: 100,
  },
  menuItem: {
    paddingVertical: 15,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuTexto: {
    fontSize: 18,
    color: "#f0f0f0",
    //color: "#444",
  },
  menuIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  linha: {
    width: 25,
    height: 2,
    backgroundColor: "#333",
    marginVertical: 4,
    borderRadius: 2,
  },
});