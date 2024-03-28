import React, { createContext, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider=({children}) =>{
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider