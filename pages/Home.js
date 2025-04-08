import React, { useState, useEffect } from "react"; 
import { View, Text, StyleSheet, TextInput } from "react-native"; 
import * as SecureStore from "expo-secure-store";
import Botao from "../components/Botao";

export default function HomeScreen({ navigation }) {

    const [texto, setTexto] = useState(""); 
    const [textoPersistido, setTextoPersistido] = useState(""); 
    const [textoSalvoSemPersistencia, setTextoSalvoSemPersistencia] = useState(""); 
    useEffect(() => {

        const carregarTextoPersistido = async () => {
            const textoSalvo = await SecureStore.getItemAsync("meuTexto"); 
            if (textoSalvo) {
                setTextoPersistido(textoSalvo); 
            }
        };
        carregarTextoPersistido();
    }, []); 

    const salvarTexto = async () => {
        if (!texto.trim()) {
            alert("Por favor, insira algo.");
            return;
        }
        await SecureStore.setItemAsync("meuTexto", texto); 
        setTextoPersistido(texto); 
        setTextoSalvoSemPersistencia(texto); 
        setTexto(""); 
    };

    const limparTexto = async () => {
        await SecureStore.deleteItemAsync("meuTexto"); 
        setTextoPersistido("");
        setTextoSalvoSemPersistencia(""); 
        alert("Texto apagado da persistência!"); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Persistência e Navegação</Text>
            <TextInput style={styles.input} placeholder="Digite algo" value={texto} onChangeText={setTexto} />
            <Text style={[styles.texto, { color: "red" }]}>Sem persistência: {textoSalvoSemPersistencia || "Nenhum texto salvo"}</Text>
            <Text style={[styles.texto, { color: "green" }]}>Texto persistido: {textoPersistido || "Nenhum texto salvo"}</Text>
            <Botao titulo="Salvar" onPress={salvarTexto} cor="blue" />
            <Botao titulo="Limpar" onPress={limparTexto} cor="red" />
            <Botao titulo="Detalhes" onPress={() => navigation.navigate("Detalhes", { textoNaoPersistido: textoSalvoSemPersistencia })} cor="green" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical: 100, 
        paddingHorizontal: 25, 
        gap: 20, 
    },
    titulo: {
        fontSize: 32, 
        textAlign: "center", 
    },
    input: {
        borderWidth: 1,
        borderColor: "gray", 
        borderRadius: 8,
        padding: 10, 
        fontSize: 20, 
    },
    texto: {
        fontSize: 20, 
        textAlign: "center", 
    },
});