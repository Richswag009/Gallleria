import { useContext } from "react";
import { AuthContext } from "./auth-context";

export function useUserAuth() {
  return useContext(AuthContext);
}
