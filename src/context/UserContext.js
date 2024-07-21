import React, { createContext, useState } from "react";

export const UserContext = createContext();

const users = [
  {
    name: process.env.REACT_APP_USER_1_NAME,
    role: process.env.REACT_APP_USER_1_ROLE,
    email: process.env.REACT_APP_USER_1_EMAIL,
    password: process.env.REACT_APP_USER_1_PASSWORD,
    avatar: process.env.REACT_APP_USER_1_AVATAR,
  },
  {
    name: process.env.REACT_APP_USER_2_NAME,
    role: process.env.REACT_APP_USER_2_ROLE,
    email: process.env.REACT_APP_USER_2_EMAIL,
    password: process.env.REACT_APP_USER_2_PASSWORD,
    avatar: process.env.REACT_APP_USER_2_AVATAR,
  },
  {
    name: process.env.REACT_APP_USER_3_NAME,
    role: process.env.REACT_APP_USER_3_ROLE,
    email: process.env.REACT_APP_USER_3_EMAIL,
    password: process.env.REACT_APP_USER_3_PASSWORD,
    avatar: process.env.REACT_APP_USER_3_AVATAR,
  },
  {
    name: process.env.REACT_APP_USER_4_NAME,
    role: process.env.REACT_APP_USER_4_ROLE,
    email: process.env.REACT_APP_USER_4_EMAIL,
    password: process.env.REACT_APP_USER_4_PASSWORD,
    avatar: process.env.REACT_APP_USER_4_AVATAR,
  },
];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, users }}>
      {children}
    </UserContext.Provider>
  );
};
