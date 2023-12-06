import Browse from "./Browse";
import Header from "./Header";
import Login from "./Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "browse",
      element: <Browse />,
    },
  ]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const { uid, email, displayName, photoURL } = user;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );
      // ...
    } else {
      // User is signed out
      // ...
      dispatch(removeUser());
    }
  });

  return (
    <div className=''>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
