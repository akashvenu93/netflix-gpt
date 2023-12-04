import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
      <form className='w-3/12 p-12 absolute bg-black my-36 right-0 left-0 mx-auto bg-opacity-80 text-white'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type='text'
          placeholder='Email Address'
          className='p-2 my-4 rounded-md w-full bg-gray-700'
        />
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Name'
            className='p-2 my-4 rounded-md w-full bg-gray-700'
          />
        )}
        <input
          type='text'
          placeholder='Password'
          className='p-2 my-4 rounded-md w-full bg-gray-700'
        />
        <button className='bg-red-700 rounded-md p-4 my-4 w-full'>
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
