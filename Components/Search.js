import React, { useState, useRef } from "react";
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
    flex: 1,
  },
});

export default function Search({ navigation }) {
  const searchedText = useRef("");
  const page = useRef(0);
  const totalPages = useRef(0);
  /*On definit une variable dans la fonction qui sera remise à 0 à
   chaque re render. On utilise useRef ici pour faire persister
   ces variables. On utilise "".current" après l'utilisation de la 
   variable plus tard */
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFilms = (reset) => {
    if (searchedText.current.length > 0) {
      setIsLoading(true);
      getFilmsFromApiWithSearchedText(
        searchedText.current,
        page.current + 1
      ).then((data) => {
        page.current = data.page;
        totalPages.current = data.total_pages;
        if (reset) {
          setFilms(data.results);
        } else {
          setFilms([...films, ...data.results]);
        }
        setIsLoading(false);
      });
    }
  };

  const searchFilms = () => {
    page.current = 0;
    totalPages.current = 0;
    setFilms([]);
    loadFilms(true);
  };

  const searchTextinputChange = (text) => {
    searchedText.current = text;
  };

  const displayDetailsForFilm = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm });
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

  return (
    <View style={styles.main_container}>
      <TextInput
        onChangeText={(text) => searchTextinputChange(text)}
        onSubmitEditing={() => searchFilms()}
        style={styles.textInput}
        placeholder="Titre du film"
      />
      <Button
        style={{ height: 50 }}
        title="Rechercher"
        onPress={() => searchFilms()}
      />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={films}
        renderItem={({ item }) => (
          <FilmItem film={item} displayDetailsForFilm={displayDetailsForFilm} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page.current < totalPages.current) {
            loadFilms(false);
          }
        }}
      />
      {displayLoading()}
    </View>
  );
}
