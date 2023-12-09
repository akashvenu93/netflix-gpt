import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../movieSlice";
import { OPTIONS_DATA } from "../constants";
import { useEffect } from "react";

const useMovieTrailer = ({ id }) => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    // fetching trailer video
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos",
      OPTIONS_DATA
    );

    const json = await data.json();
    const filterData = json?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : json?.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
