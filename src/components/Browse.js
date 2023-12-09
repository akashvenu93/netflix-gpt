import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies";
import Header from "./Header";
import MovieContainer from "./Moviecontainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MovieContainer />
    </div>
  );
};

export default Browse;
