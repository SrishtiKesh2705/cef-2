import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(true);

  async function fetchUser(token) {
    try {
      const response = await api.get("/me/");

      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    const response = await api.post("/login/", {
      email,
      password,
    });

    const { access } = response.data;

    localStorage.setItem("accessToken", access);
    setAccessToken(access);

    await fetchUser(access);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}