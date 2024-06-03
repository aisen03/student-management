import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setCurrentUser: () => {},
  clearUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setCurrentUser = (user) => {
    setUser(user);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setCurrentUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
