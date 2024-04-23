import { LoginCredentials, User } from "@/Types";
import axiosClient from "@/lib/axiosClient";
import { createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    localStorage.getItem("user") && setIsAuthenticated(true);
  }, [isAuthenticated]);

  const login = (credentials: LoginCredentials) => {
    try {
      axiosClient.get("/sanctum/csrf-cookie").then(async () => {
        console.log(credentials)
        const response = await axiosClient.post("/login", credentials);

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setIsAuthenticated(true);
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    const response = await axiosClient.post("/logout");
    if (response.status === 204) {
      localStorage.removeItem("user");
    }
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
