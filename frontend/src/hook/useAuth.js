import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
