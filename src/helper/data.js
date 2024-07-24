import { useContext } from "react";
import data from "../data/omdb-movies-brief.json";



const movies = data.filter((item) => item.Type === "movie");

const allMovies = (data) =>
  data.filter((item) => item.Type ==="movie");



const filteredMovies = (filter) =>
  movies.filter((item) => item.Title.toLowerCase().includes(filter));

export { allMovies, filteredMovies };
