/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => { },
  setUserToken: () => { },
  currentRole: 0,
  setCurrentRole: () => { },
});


export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const savedRole = localStorage.getItem("roleID");
    if (savedRole) {
      setCurrentRole(parseInt(savedRole));
    }

    const savedUser = localStorage.getItem("CURRENT_USER");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const updateRole = (role) => {
    localStorage.setItem("roleID", role.toString());
    setCurrentRole(role);
  };

  const updateUser = (user) => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(user));
    setCurrentUser(user);
  };

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }

  return (
    <StateContext.Provider value={{
      currentUser,
      setCurrentUser: updateUser,
      userToken,
      setUserToken,
      currentRole,
      setCurrentRole: updateRole,
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)