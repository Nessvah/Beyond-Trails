import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

/**
 * ! useState vs useReducer.
 * * Why I chose useReducer:
 * * I chose to use useReducer since authentication often involves more than just
 * * seting a user's authentication status. Usually it handles many more states which can become very
 * * complex to manage with useState hooks. With useReducer, I can centralize all the logic within
 * * the reducer function, but also the state changes become more predictable because all
 * * state changes are handled in one central place (the reducer function).
 */

// this will create the new context obj that  will be used to share
// the authentication state and functions between components inside
// of it's context

export const AuthContext = createContext();

// keep track of users actions states for the authReducer
export const UserActions = {
  LOGIN: 1,
  UPDATE: 2,
  LOGOUT: 3,
  CLEARTOKEN: 4
};

// Reducer function to handle authentication state changes according
// to actions

function authReducer(state, action) {
  //We will have diferrent actions like login , or logout
  switch (action.type) {
    case UserActions.LOGIN:
      Cookies.set("jwt", action.payload.accessToken, { expires: 7 });
      Cookies.set("name", action.payload.name, { expires: 7 });
      Cookies.set("id", action.payload.userId, { expires: 7 });
      Cookies.set("role", action.payload.role, { expires: 7 });
      return {
        ...state,
        userName: action.payload.name,
        userId: action.payload.userId,
        token: action.payload.accessToken,
        role: action.payload.role,
        isAuthenticated: true
      };

    case UserActions.LOGOUT:
      Cookies.remove("jwt");
      Cookies.remove("id");
      Cookies.remove("role");
      Cookies.remove("name");
      return {
        ...state,
        userName: null,
        userId: null,
        token: null,
        role: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

// this component will serve as the provider for the auth context.
// It'll receive children as props, which represents the child components
// that will have access to the auth context.

//* to work with cookies, we can do it natively by using document.cookie or
//* we can use js-cookie library which simplifies the whole process of dealing
//* with cookies.

export function AuthContextProvider({ children }) {
  // Use reducer to manage the authentication state
  // Use reducer will have a cb and the initial state
  const [state, dispatch] = useReducer(authReducer, {
    userName: Cookies.get("name") || null,
    userId: Cookies.get("id") || null,
    token: Cookies.get("jwt") || null,
    role: Cookies.get("role") || null,
    isAuthenticated: !!Cookies.get("jwt") // this will set true or false accordingly
  });

  // to see every change on the state
  console.log("AuthContext state: ", state);

  useEffect(()=> {

  }, [state])

  return (
    // spread all the values on the state object to the children
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
