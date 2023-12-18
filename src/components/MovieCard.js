import { IMG_URL_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className='w-48'>
      <img src={IMG_URL_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
