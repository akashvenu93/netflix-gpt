import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { AVATAR_IMG, LOGO, OPTIONS_DATA } from "../utils/constants";
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsusbscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsusbcribe the observable on component unmount, as it is not required on each render other than authentication
    return () => {
      unsusbscribe();
    };
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className='w-screen z-10 absolute bg-gradient-to-b from-black flex justify-between'>
      <img className='w-40' src={LOGO} />
      {user && (
        <div className='flex m-2 p-2'>
          <img className='w-12 h-12 rounded-md' src={AVATAR_IMG} />
          <button className='font-bold text-white pl-2' onClick={handleSignout}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
