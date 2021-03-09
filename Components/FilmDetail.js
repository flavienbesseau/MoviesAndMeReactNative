import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from "../api/TMBDApi";
import moment from "moment";
import numeral from "numeral";

const FilmDetail = ({ navigation }) => {
  const idFilm = navigation.getParam("idFilm");
  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFilmDetailFromApi(idFilm).then((data) => {
      setFilm(data);
      setIsLoading(false);
    });
  }, [idFilm]);

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

  const displayFilm = () => {
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />

          <Text style={styles.film_title}>{film.title}</Text>
          <Text style={styles.film_overview}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de vote {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) : {film.genres.map((genre) => genre.name).join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{" "}
            {film.production_companies
              .map((company) => company.name)
              .join(" / ")}
          </Text>
        </ScrollView>
        /* SV c'est comme une vu, mais quand c'est trop gros,
        ca va scroller vers le bas automatiquement*/
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {displayLoading()}
      {displayFilm()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  film_title: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  film_overview: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});

export default FilmDetail;
