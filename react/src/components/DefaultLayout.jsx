/* eslint-disable no-unused-vars */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import logo from '../assets/TigerVoteWhite.png'
import axiosClient from "../axios"


const navigation = [
  { name: 'Dashboard', to: '/'},
  { name: 'Elections', to: '/elections'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken, currentRole } = useStateContext();
    console.log(currentRole);
    if(!userToken) {
        return <Navigate to='login' />
    }

    if (currentRole === 3) {
      return <Navigate to="/voting" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout').then((res) => {
          setCurrentUser({});
          setUserToken(null);
        });
    };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-green-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) => classNames(
                              isActive
                                ? 'bg-white text-green-800'
                                : 'text-white hover:bg-slate-200 hover:text-green-800',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className='w-8 h-8 bg-white p-2 rounded-full text-green-800'/>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                  <a
                                    href="#"
                                    onClick={(ev) => logout(ev)}
                                    className={'block px-4 py-2 text-sm text-gray-700'}
                                  >
                                    Sign out
                                  </a>
                              </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-green-800 hover:bg-slate-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      as="a"
                      to={item.to}
                      className={({ isActive }) => classNames(
                        isActive ? 'bg-white text-green-800' : 'text-white hover:bg-slate-200 hover:text-green-800',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon/>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        onClick={(ev) => logout(ev)}
                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:border-red-800 hover:white"
                      >
                        Sign out <ArrowRightOnRectangleIcon className='text-white h-6 pl-2'/>
                      </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Outlet />                
        
      </div>
    </>
  )
}
