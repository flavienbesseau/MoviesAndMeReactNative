const apiKey = "a4178169071f9856a79267769d595477";

export function getFilmsFromApiWithSearchedText(text) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr&query=${text}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
