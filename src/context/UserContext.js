import React, { createContext, useState } from "react";
import owner1 from "../../public/owner1.png";
import owner2 from "../../public/owner2.png";
import owner3 from "../../public/owner3.png";
import admin from "../../public/admin.jpeg";

export const UserContext = createContext();

const users = [
  {
    name: process.env.REACT_APP_USER_1_NAME,
    role: process.env.REACT_APP_USER_1_ROLE,
    email: process.env.REACT_APP_USER_1_EMAIL,
    password: process.env.REACT_APP_USER_1_PASSWORD,
    avatar: owner1,
  },
  {
    name: process.env.REACT_APP_USER_2_NAME,
    role: process.env.REACT_APP_USER_2_ROLE,
    email: process.env.REACT_APP_USER_2_EMAIL,
    password: process.env.REACT_APP_USER_2_PASSWORD,
    avatar: owner2,
  },
  {
    name: process.env.REACT_APP_USER_3_NAME,
    role: process.env.REACT_APP_USER_3_ROLE,
    email: process.env.REACT_APP_USER_3_EMAIL,
    password: process.env.REACT_APP_USER_3_PASSWORD,
    avatar: owner3,
  },
  {
    name: process.env.REACT_APP_USER_4_NAME,
    role: process.env.REACT_APP_USER_4_ROLE,
    email: process.env.REACT_APP_USER_4_EMAIL,
    password: process.env.REACT_APP_USER_4_PASSWORD,
    avatar: admin,
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
