import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import filmItem from "./FilmItem";

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  main_container: {
    marginTop: 30,
    flex: 1,
  },
});

export default function Search() {
  return (
    <View style={styles.main_container}>
      <TextInput style={styles.textInput} placeholder="Titre du film" />
      <Button style={{ height: 50 }} title="Rechercher" onPress={() => {}} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={films}
        renderItem={({ item }) => <FilmItem film={item} />}
      />
    </View>
  );
}
