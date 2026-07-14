import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const GUEST = {
  name: "",
  email: "",
  password: "",
  image: null,
  pay: 0,
  deliver: 0,
  ship: 0,
  review: 0,
  cancel: 0,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(GUEST);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = (data) => {
    setUser({ ...GUEST, ...data });
    setIsLoggedIn(true);
  };

  const login = (email, password) => {
    if (user.email === email && user.password === password) {
      setIsLoggedIn(true);
      return { success: true };
    }
    if (!user.email) {
      return { success: false, message: "No account found. Please sign up first." };
    }
    return { success: false, message: "Incorrect email or password." };
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
