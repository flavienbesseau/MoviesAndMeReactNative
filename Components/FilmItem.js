// Components/FilmItem.js

import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../api/TMBDApi";

/*On peut pas mettre d'évenement sur les view, c'est limité...
donc on importe Touchable Opacity (pour le onclick)*/

export default function FilmItem(props) {
  const { poster_path, title, vote, overview, release_date, id } = props.film;
  const { displayDetailsForFilm } = props;
  return (
    <TouchableOpacity
      style={styles.main_container}
      onPress={() => displayDetailsForFilm(id)}
    >
      <Image
        style={styles.image}
        source={{ uri: getImageFromApi(poster_path) }}
      />
      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{title}</Text>
          <Text style={styles.vote_text}>{vote}</Text>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text} numberOfLines={6}>
            {overview}
          </Text>
          {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
        </View>
        <View style={styles.date_container}>
          <Text style={styles.date_text}>Sorti le {release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});
