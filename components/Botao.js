import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; // Importa componentes e funções do React Native

export default function Botao({ titulo, onPress, cor }) {
    return (
        <TouchableOpacity style={[styles.botao, { backgroundColor: cor }]} onPress={onPress}>
            <Text style={styles.textoBotao}>{titulo}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    botao: {
        padding: 10, 
        borderRadius: 8,
        alignItems: "center", 
    },
    textoBotao: {
        color: "white", 
        fontSize: 20, 
    },
});