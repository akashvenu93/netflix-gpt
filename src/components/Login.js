import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
      //name.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAMFBgcCAQj/xAA9EAACAQMDAgMGAwcCBQUAAAABAgMABBEFEiExQQYTURQiMmGBkQdxoSMzQmKxwfCy0QgVUqLhJUOCkuL/xAAZAQACAwEAAAAAAAAAAAAAAAACAwABBAX/xAAlEQACAgICAQUAAwEAAAAAAAAAAQIREiEDMUEEEyIzUTJSYRT/2gAMAwEAAhEDEQA/AIjSJjFGkckR3ydCaNuLSSIgyKdzHgZoq8sm9rikO2KCH07mnL68husSZ5UYWuPcWviBRXr/AE6SS4QJPiRv4euKJexmQrvYEjvQhn8u7Zgdzetd+1Tl9zAgHvQqMi6FfCNIju5IqPunaa3CIhA7k0fcpIYWlVSwAqKe+2AIwwT69qbGNlUeaZE8E4ZUJA6mjb+8E4YFvhHSu5JFGngwtlj1xUYLV2iLP8RqJ32UCXd6Wg8pAM/KhFm2MGbqKNkiijHuLk5wWocwKX4G71p0dEDdN1ea0lYwgHd3NEy37ahPh8Agfeq/M7JIVVcYomz3RxmfljQPiheVbIHywec3lsVwOvFPRaPa6pEtjZxRxXXX2hvkfl1oGze4nV5QgCnqTRllIsLExylWHcdabFuHZBmbwNq6vIkPkzGM4O1sc1Xr+xutPnMF3EY5B2Peti8F6hotppN1JrF6sc3JG4/09TVd0PS7TU9Zku9bJa1Zz5Sv/wBGeM/P1rUtpMJS/TNWz3BFeBiK0/xnb6dHdRW2gIk8K4OFGdp9AamNB/DC41NYdSvreOJcZWJvib86lbLUrMXL5pVteufh2jX7bNGXaFABiOAf/Ne1CZIDvLye4iYNG2OpPagngcWgmXNGm7b2QQ5Ulmxn0ruS3mhjjtnwYzzu7VzIR/C3ohIY2imDMCSe2KNvmeVIkiiGTwaFu70Q352+8AMDApyO6SODz5Juc9Kun47KthxbybUIo5xzxUNJZwTS5lXinLrVXn91Rz2AHWgku545AtxFtz61I8b8MisMnhMrxwWwCjsoFGjw/Lg+13SQqRyuct9u1SegW8NuvtUgUyv0Lfwig9VuLiZ2EEfugfxj+1V06NvD6VNZTIsaPa3Vz7JBcFCQcNIvU+goG400WjMi4bYcHFH6PHK15JcPJzF0wO9MXd4DeMJOAzfamr8GS4IVpFZuWAuijLgZo9mCwCNFCjuaIvLOKRt4AAHQ0JY2suoXvskCu7eijPFNxTRhnChzzhDb+RGchuMDqaKsNC1DU7oW+n27vMRnafdwPrRWkWcul67bD4p0kG1Sm7H0re4bS0QR3sttA0ygftYU2uv0PNGuPIUfPOreFtT06ZV1NCknUKen0rRfBGg2GqWMXtDO0qEbl3dqs3jPR016CGe2uEeMHYJV5C/n6f59QPB1hLpcU0F3+wvbaTDBhgOnZh6g+tFi4z10R7LBqei2WnwW5sdOif8AaqNmPXvVliyYlypU45HpQ9kd8T+byytyD29MU1q98LC0S4GWHmouB33HH96e2qLSokOK8rMrvxnqDXc21GUB8BVxx969pfuIspmnbNQsI73AjWQ4w3XrjNOa5dRx2W2O5DMOMd6VzpNxa24WFBtUcc8VAPCTcETsoJNYtIlDULmCYSuN4PWuLpoZCXyRk/CK4vxIku2HlK6mtdkavGcsw5qaTLo5trvdcIIFC7erNT98rT3UbSSB+eccYFQzwujkZIJo+KD2WDzHYkkcZqnS6C445TSLJa34RVR23MTk/wCwqWaaKW2IwWZiFCg8ufTPpVHspS9x5hJIUcD51Z/D93avqSRyzqZFOEU9ee9TG0dXKiYXw1M2nvIuFdxnaBWf69p91pc227Rk3chsdvX/AA1pniTxXNoBS3S1GWHMjDdgfJR1NNWV7D4o0+Rbm0lKKuHE0Owk46jFNxSViXJvRmVjee2JNbbh5gHuH1Fbv+Fnhu10rwvbTOiSXl2vmzSFcnnoufQCvn7UdNbQddkVCTGH4z1CnpWy+E9XnfR7VoZ2XHukA+lMjJRZl5U2rYY3g+4j/EaLVNim3LGRWUcDC4wa0Uop6qD+YoO1vo5ggLftMUaOlaI9aM9A81hazI6S20TLJ8Y2D3qqnjazWOyt44L+2tBCGVRPG7lkI+HIOccA/QVcmcIMn0qj6/4ojg1KVRD5vke7jtmhk0uyNFZuvHk82lpaufJuUUxzujcSqOjr3HI6H1qNm8TX7TQWjys1ssgkRSeDxn+tO+LNai1uOMm1ihdO4jBJ+tUu5kkH7MsTyCuOAtJcm2UWLX9ZivdQNxapsVo13DGPeAwaVVZvOVzhuvPXNKhKNWKJdbVY4VBj86iPEmmW3s4e2iG/5VWoNXmhODJx+dK51yYsuTlDXMUubLY5T/UDPbyiQRrDljQm6a1uGMsRIHrVkgXOJVOCR1NezxWskTmUAyduK2Zv8LnorEE8l/ebRGqoD1xTniVxE8NumCwXoO+aldGtEVpppCBg8CoHxFKH1ltvACL9qOabd0M9P9gzG3kqD6An69KmtC0Tzbu31GaYhfOTZ73QggYxVcll3nK4CKcsT3q12N0sWkW87CX2eNs+ZHzsbseP61UbRsli9fhqeuWNnlbi7t/PUDkAc/TmubW60n2QR2KhFz7y4wQfmD3qB0eK/ukW5vZWmj6xvdMo+wXOftT0dnI19PqExXy/gjCLt3fzHn7UbTSsWq6KP+IdjAl69wZVV3C+WhPL84wB9aL/AA/vlUzWUjfzJ+Y4P+fKon8RrpLrxDaQqvEEec+uT0/7agrHVG0zUvPU/u5SSPUZ5qNa0Ln8k0bGNYe1vFkIOV+GrU19cSWBvkufL2qTs4xVWt7FLxI7mbAhZQwJprWNVt418hI9yHjINB/1ccfjezGlW2So8R3GoMYTKsZ6cd6hL/S76SWVogHZssTgUDZRwzuJG3Iyn8qnY9fgsUaIe85XA3UL9VxXthvGjPbh5YJjHKQSeKOtPB93qUImDqqHnPWiZ4tPuNRWWSZVZnLMueKnNX1j/lmkoliDINwXCkdPUU7gantsVFmeanpFxYXb27SqxXvilU8urLcZklsmL9y5GaVbMEFogodNuZ5wHUih7mKaGUKye6GxVgOsQx/CvvHmuTqFjcAGVOnyrlYyvoJxsMtE9ps4VTINQ+pxXUFy42NtzwalI9Yt4okMKfCaH1LW0usbY+e/FNSaQc46I9ZCFKIDuPJ5ofxfpM9vpNhqzIQlxuiYnsRgj7jP2r17hhdxmMDc7Dg96vvje3nu/BdpbTrGg85GXAyeOv6Gn9xtlwtTSMVvGkGVB4GOB0qX8KeIv+VyC1vSTaSe6T6Chb2Ae3PwQhAAFAXNttiOMbk5HzxRLFqhnyTs3bRLCJrdJIr3EJ5ARQCR+dSmp3MaWyWtmcsepx0HrWcaNHdrYQm3mkjBUEqDxVx0aMhCZXZn75OaS5eB7dmffiRaNaajYXKg7WyhP6/71X7mze5vjFEMmdsAfPP+fetU8WaOmradIky84yvHw/OswEktvOD/AO9A5wO5Pf8AUfpRK2tCX2arNrMcllbrYKzQOoVUxyuOMH0xivHsGlVZJE8vHJHpVM0/Xkiy7QoRliABgqTyeD88/epmz8Sw3ltKm9oZiBhXHH5A1yZen5OJuUUJ5IPsl7zEto0Mc6iRRxt61CRWl1dyRrIu3ZyXPSntE8z9tdT4dRwPdoS71Sa5maJG8mIHAI4NDBScnrozMG1mytsPsnzMpyNpqNm1a88uGJ2wqd8V3PEyXm2Jy5H60HPpt9dyMAjAL7xrfxvFVIFsn7W+3QglFJ7nNKq7HHcou3DjHpSrWudkslpdE1CNC7xEgelD29lOUd3ibaO9bbeRFIhGbQunfA5qOuLIXFt5ENg6g9crisy5JPwb7RlEFr5x2IT9Kkl0GZrVpFiYgfxVddN8KS2jO5tWbPQZFWa3tZPYxGbPaQOnFVKU70mVnbMNfSbie5QyuYIwcbip5PyqxazqqQWUcNzKyhY9qI5ywHdj6fIU7+IfiNdN1A6dDD5DwgeY27ksRwB96zO+uJ7ycl3ZizEnJz+VNjlLsfHGKtdknF/6hctOqbYuiqewBoS5iXzUjIOW3E/keKPjuFjsIreFQAowx7sachtfatcs48cySIuPkCM/qf0pvkHwaN4XsI2sIEbOQgHIOPvVmisUiXIdcDrjmpS0g2RIEVVAGBgUV5Ax0H2oVC9kciv3NjJPFiNB5f8AMcZrG/xD0mXS9e/bBFS6TzF2HgMDg/2r6AaP5Vmv4zaYH0u1v1X3oJdrH+Vhj+u2mwVSF8juJkBdwQN31rtJGH8RH5GuHHFeA+5WlJGW2TugarcwXDWySnbcDaAxJG7t/f71KalBdAw7mVQ46L61S1YiRSDjBBB+eatEWoLdzvPNIQIwSozWL1CxkpJAvRIaOWiZmkRnbpmuNS1CY71hfYwGDXGlasxt5ugZvhJFACOa+1NRkFnbkisqj8spAdnUWoTRoFcbm9aVWtNP0u2RI5JYw4Hvbj3r2hfKv6l0jcoZ4pVypBp0Fc8VQ7bWBHGR7yEdqlE1JiqursUPpW5TNb4y1cD0r3g1U/8Am+T++OKefWFit5JDIfdRmH0FX7qB9tnz9+I14dS8WardlAg9skhA3ZOEJQH/ALaiLRTIPMxyn+1MSym5dnPWTLn8zzR2h+XJDOjjKggOfQEmjnGkFxyth1vZySGJQvGefl/mKl/AFs1/4yiUHc7XDBR6Iilj+pWnZpobCxQlgHlHB6kkjp9O/wD5o78B7Vrjxe9yfhtrJ/zyxUZ/1UHEsmxvM8EkbUkO0AeldlSKNkhHxChpDRVQpSsY2ZqO8T6INX8L6taYy8tq6x8dGHII+oFTMC+YwFGqoUADtRRW7BlLVHx0x3LuHRhmmh0NWHxrpA0TxTqmnKu2OKcmMdtjAMuPowH0qvf9VPFDQP8AWjo1zEGPubuhz1qPiOR9KnbDT5J7Da4Pluu9D6Gs/NVbI1Y1Y21zdyKkB93PLVZbDSI47SS7luSksbYAHrTnh3SNQNioiVQMnLkV7f2FxYt7I7F2kBcBR3rnzm29EfG0rH2tEnIkKh8j4s15U7p3hSW7sLeeCWRVdASPnSpWP+k9qQ+92HshMGAIbBpqDWZrfLRSjaeqnoagIr0HTJF8zlnGBXMDRt8RJroKJpyLnY63Z3xCXK+TITw46ZpjxBdT2GmagQQwFtIUY9D7pquRJGisxJxntXt/qxk8P6jblsp7O6qznlSRirxtkb0ZzGuwMCfexk0foV1bWwmibbJI5DEnO3jOB+tR02I4PUuc0zpX76Qfy1pnHJUIhLF2T2pTFoku5BjAxEDxntwPQcc1qP8Aw8Wg9n1i9K87ooAfyBY/6lrGrjzHjaSVy54GWOcCt1/AFQnhS9I6yXzMf/og/tVRhgtBcnJm7ZqR+dMTQJKpGdp9RThNeE1dAJ0cwRrCmByfWnc8VwK8kOBxUSI2Yb+PtokPiLTrxVw11asjH1Mbf/uspz7zflWuf8Q0i+3aBED74hnY/kTHj+hrIV/eGi8FA8B6D5VrnhjTPbNB0Y2iBpWiG/I4HJ61kUPTnrWm+AtadPDU9s7e9bTbY8HkhsED75+mKy+qv27DitltW29hFxHDI/l5ycDK7u9OWltb3+qWt0zIFV8EHvkV5f6mnskSqANowRj5cmhtKvVu5DJc4aOMYSMcDpyfzrlpmh10XPS5IrSzWAspCMwXB7ZOK8qgzyXF/PJLZ3HssCtsRM9cd/vmlRUyZop6zQ5ztwB0Fdm4d3Ux4CjrQEWD1opM5wVwPWuoJD4bsLwx+9D6/cW8dg3mCP8AaYGzOC1JEVzk9u1Q2t27vMjuNwKlRkfPpn61cVbKb0QVxIZGZsYHYegp7RrYyLd3AYAQIuV9dzAU1c2xj+HIPp1FE6Lfi3t72yaHLXYTbJnlNjbvsf8AanPsAdulHs7gdBjNbp+A6FfB8jno90+PpxWGS+9BMOuRX0B+DkXs/gPTvWUySH6u1ECX2uepr3Pu1yvWhId01IctinKYc5cD51ZGfPn436iL3x3JbKcpY28cP/yI3n/Uv2rPx8dSvijURq/ibVdRUhkuLp2QjoUzhT9gKix8RqFgiZzgDvU94TmlXVPZt5CzJyucDI5BP6/eoiCPc2DVi8J2oe7nkzkxRgKO/J5P6frSub63Za7LTd3jx+7JnABDA968glEFgzwvjd0DeppyeNLuAmUe+o4NR2ozrb2q7BxjaM9ya5kYhN3sKUsVAifAUYOD3pUxBvSFFjbeuOoNeUeIFELByRRwJzjtSpVtGjhOxQV4pjWFDaejnqJB/Q0qVXH+RUuiAnAWLd1J9a58PEPLqG9VJNm5BI5BDKeKVKnyFo6HKOPnX0X+HKhPBeihRgGyiP1K5pUqsFluH7sUkpUqos77GojX5nt9Jv5ojh47eRlPoQppUqiIz5NgA8lfypfxGlSqyxWR5Y1L6GCNVKqxXdEQcHsWWlSpfL9bJ5LkTtiZR0QYFQYLTMfNZm2sxGaVKuaieTy1t0eBXLOC2c4YjvXlKlUbLo//2Q==",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          navigate("/");
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          navigate("/error");
        });
    }
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
