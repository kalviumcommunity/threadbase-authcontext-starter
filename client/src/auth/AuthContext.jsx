
import { createContext, useContext, useReducer } from "react";

// 1. Create a private AuthContext
const AuthContext = createContext(null);

// 2. Initial authentication state
const initialState = {
  user: null,
  accessToken: null,
};

// 3. Reducer to manage authentication state
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };

    case "LOGOUT":
      return {
        user: null,
        accessToken: null,
      };

    case "TOKEN_REFRESHED":
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };

    default:
      return state;
  }
}

// 4. AuthProvider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
