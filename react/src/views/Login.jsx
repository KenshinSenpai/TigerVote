import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { EyeIcon, EyeSlashIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const { setCurrentUser, setUserToken, setUserRoleID } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    axiosClient
      .post('/login', {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user)
        setUserToken(data.token)
        setUserRoleID(data.roleID)
      })
      .catch(({ response }) => {
        setError(response.data.error)
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Voter Code
              </label>
              <div className="text-sm">
                <Link
                  to="/signup"
                  className="font-semibold text-green-900 hover:text-green-700"
                >
                  Forgot Voter Code?
                </Link>
              </div>
            </div>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"

                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="h-full rounded-md border-0 bg-transparent py-0 px-4 text-green-900 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {error && (
            <div className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm text-white shadow-sm">
              <XCircleIcon className="h-6" />
              <span className="text-white text-sm pl-2 pt-[3px]">{error}</span>
            </div>
          )};
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Sign in
            </button>
          </div>
        </form>

      </div>
    </>
  );
}
