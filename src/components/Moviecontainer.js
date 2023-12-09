import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MovieContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];

  const { title, overview, id } = mainMovie;

  return (
    <>
      <div>
        <VideoTitle title={title} overview={overview} />
        <VideoBackground id={id} />
      </div>
    </>
  );
};

export default MovieContainer;
