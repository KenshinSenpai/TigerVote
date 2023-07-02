import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);

    axiosClient.post('/getvotercode', {
      email,
    }).then(({ data }) => {
      setCurrentUser(data.user)
      setUserToken(data.token)
      setAlertMessage(data.message)
    }).catch(({ response }) => {
      console.error(response);
      setAlertMessage(response.message)
    }).finally(() => {
      setLoading(false);
    });
  };

    return (
      <>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot your Voter Code?
            </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form onSubmit={ onSubmit } className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
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
  
              <div className='flex flex-col space-y-4'>

                {loading && (
                  <div className='flex justify-center'>
                  <span className="loading loading-spinner text-primary justify-center"></span>
                  </div>
                )}
                
                {alertMessage && (
                  <span className='flex w-full justify-center text-center items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                    {alertMessage}
                  </span>
                )}
              
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  Send Email
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Got your Voter code?{' '}
              <Link
                to="/login"
                className="font-semibold leading-6 text-green-900 hover:text-green-700"
              >
                Start voting now!
              </Link>
            </p>
          </div>
      </>
    )
  }
  