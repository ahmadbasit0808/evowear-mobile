import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Ahmad Basit",
    email: "saytamyadav4444@gmail.com",
    password: "password",
    pay: 1,
    deliver: 12,
    ship: 3,
    review: 8,
    cancel: 1,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
