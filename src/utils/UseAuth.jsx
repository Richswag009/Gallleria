import { redirect } from "react-router-dom";

export function getAuth() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuth();
}

export function checkAuthLoader() {
  const token = getAuth();
  if (!token) {
    return redirect("/");
  }
  return null;
}
