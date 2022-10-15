import React, { createContext } from "react";
import {
  deafultUser,
  UserInfo,
  userInfoContext,
  UserInfoContextType,
} from "./utils";
import { useLocalStorage } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserInfoContextType>(userInfoContext);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<UserInfo>("user", deafultUser);
  // const [user, setUser] = useState<UserInfo>(deafultUser);

  const login = (user: UserInfo) => {
    if (user !== null) {
      setUser(user);
    }
  };

  const logout = () => {
    setUser(deafultUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
