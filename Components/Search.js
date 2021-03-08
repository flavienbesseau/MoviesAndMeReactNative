import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../api/TMBDApi";

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  main_container: {
    marginTop: 30,
    flex: 1,
  },
});

export default function Search() {
  searchedText = "";
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFilms = () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      getFilmsFromApiWithSearchedText(searchedText).then((data) => {
        setFilms(data.results);
        setIsLoading(false);
      });
    }
  };

  const searchTextinputChange = (text) => {
    searchedText = text;
  };

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  };

  console.log(isLoading);

  return (
    <View style={styles.main_container}>
      <TextInput
        onChangeText={(text) => searchTextinputChange(text)}
        onSubmitEditing={() => loadFilms()}
        style={styles.textInput}
        placeholder="Titre du film"
      />
      <Button
        style={{ height: 50 }}
        title="Rechercher"
        onPress={() => loadFilms()}
      />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={films}
        renderItem={({ item }) => <FilmItem film={item} />}
      />
      {displayLoading()}
    </View>
  );
}
