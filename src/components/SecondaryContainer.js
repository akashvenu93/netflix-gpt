import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  if (!movies) return;

  return <MovieList title={"Now Playing"} movies={movies} />;
};

export default SecondaryContainer;
