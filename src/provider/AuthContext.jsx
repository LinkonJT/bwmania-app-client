import React, { createContext } from 'react';


export const AuthContext = createContext()






/***
 * 
 * createContext() makes a new Context object.

Think of it like a container that will hold your authentication-related data (user info, login/logout functions, etc.).

You’ll provide values to this context from a Provider, and then consume them anywhere with useContext.
 */