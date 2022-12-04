import { createContext, useEffect, useState } from "react";

import { onAuthChange } from "../utils/firebase.util";

import { UserSimple } from "../utils/types.util";

type Props = {
  children: JSX.Element;
};

type UserContextType = {
  user: UserSimple;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: {
    uid: "",
    username: "",
    avatar: "",
  },
  isLoggedIn: false,
});

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserSimple>({
    uid: "",
    username: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser, setIsLoggedIn);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
