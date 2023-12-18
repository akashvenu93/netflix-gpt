import { useDispatch } from "react-redux";
import { OPTIONS_DATA } from "../constants";
import { addNowPlayingMovies } from "../movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getMoviesList = async () => {
    // fetch now playing movies
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      OPTIONS_DATA
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json?.results));
  };

  useEffect(() => { 
    getMoviesList();
  }, []);
};

export default useNowPlayingMovies;
