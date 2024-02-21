import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { testInstance, debounce } from "../api/test-api/api";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, setUsersData } from "../reducers/usersReducer";

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const navElements = document.getElementsByTagName("nav");
    navElements[0].style.display = "none";
  });

  const responseMessage = (response) => {
    console.log("response");
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log("error");
    console.log(error);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("access_token", codeResponse.access_token);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    dispatch(setUsersData([]));
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          dispatch(setUsersData(res.data));
          // navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const fetchUsersData = async () => {
    await testInstance
      .get("/users")
      .then(function (response) {
        // handle success
        dispatch(setUsersData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const startNewTrial = async () => {
    // Navigate to another page
    await fetchUsersData();
    // debounce(fetchData, 500);
    navigate("/");
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-64 lg:px-8">
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        {profile && (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button
              className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 justify-center rounded-md px-3 py-1.5 text-sm font-semibold border-black border-2"
              onClick={logOut}
            >
              Log out
            </button>
          </div>
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <button
                className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 justify-center rounded-md px-3 py-1.5 text-sm font-semibold border-black border-2"
                onClick={() => login()}
              >
                Sign in with Google 🚀{" "}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link to="/signup" className="hover:text-indigo-500">
              Not a member?{" "}
            </Link>
            <button
              onClick={() => {
                startNewTrial();
              }}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
