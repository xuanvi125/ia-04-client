import { createContext, useContext, useReducer, useEffect } from "react";
const authContext = createContext();
function authReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitialize: true,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOG_IN":
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuth: false,
        user: null,
      };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuth: false,
    isInitialize: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "INIT", payload: { user: null, isAuth: false } });
    } else {
      dispatch({ type: "INIT", payload: { user: null, isAuth: true } });
    }
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
export function useAuth() {
  return useContext(authContext);
}
