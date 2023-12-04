import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    setErrorMessage(
      checkValidateData(
        email.current.value,
        password.current.value,
        name.current.value
      )
    );
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='z-10'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg'
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 p-12 absolute bg-black my-36 right-0 left-0 mx-auto bg-opacity-80 text-white'
      >
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type='text'
            ref={name}
            placeholder='Name'
            className='p-2 my-4 rounded-md w-full bg-gray-700'
          />
        )}
        <input
          type='text'
          ref={email}
          placeholder='Email Address'
          className='p-2 my-4 rounded-md w-full bg-gray-700'
        />
        <input
          type='text'
          ref={password}
          placeholder='Password'
          className='p-2 my-4 rounded-md w-full bg-gray-700'
        />
        <p className='text-red-500 font-bold py-3'>{errorMessage}</p>
        <button
          className='bg-red-700 rounded-md p-4 my-4 w-full'
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className='py-4 cursor-pointer hover:underline'
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already Registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
