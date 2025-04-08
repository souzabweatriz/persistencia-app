import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import TextoExibido from "../components/Text";
import peopleInfo from "../data/people";

export default function DetalhesScreen({ route }) {
  const { textoNaoPersistido } = route.params;
  const [textoPersistido, setTextoPersistido] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("meuTexto").then((textoSalvo) => {
      if (textoSalvo) {
        setTextoPersistido(textoSalvo);
      }
    });
  }, []);

  return (
    <View>
      <Text>Detalhes</Text>
      <TextoExibido titulo="Sem persistência" texto={textoNaoPersistido} />
      <TextoExibido titulo="Persistência" texto={textoPersistido} />
      <Text>Pessoas:</Text>
      {peopleInfo.map((person, index) => (
        <Text key={index}>
          {person.name} - {person.emoji}
        </Text>
      ))}
      <FontAwesome name="home" size={24} color="black" />
      <Entypo name="add-user" size={24} color="black" />
      <MaterialIcons name="restaurant-menu" size={150} color="red" />
    </View>
  );
}