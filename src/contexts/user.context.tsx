import { createContext, useEffect, useState } from "react";

import { onAuthChange } from "../utils/firebase.util";

import { SignState, UserSimple } from "../utils/types.util";

type Props = {
  children: JSX.Element;
};

type UserContextType = {
  user: UserSimple;
  isLoggedIn: SignState;
};

export const UserContext = createContext<UserContextType>({
  user: {
    uid: "",
    username: "",
    avatar: "",
  },
  isLoggedIn: "loading",
});

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserSimple>({
    uid: "loading",
    username: "",
    avatar: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState<SignState>("loading");

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
