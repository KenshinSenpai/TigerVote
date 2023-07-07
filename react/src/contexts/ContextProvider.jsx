/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    userRoleID: {},
    setCurrentUser: () => {},
    setUserToken: () => {}
});


export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userRoleID, setUserRoleID] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');

    const setUserToken = (token) => {
      if (token) {
        localStorage.setItem('TOKEN', token)
      } else {
        localStorage.removeItem('TOKEN')
      }
      _setUserToken(token);
    }
    
    return(
        <StateContext.Provider value={{ 
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            userRoleID,
            setUserRoleID
         }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)