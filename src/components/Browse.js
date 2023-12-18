import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies";
import Header from "./Header";
import MovieContainer from "./Moviecontainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MovieContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
