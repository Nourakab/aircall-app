import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Header.css";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="toolbar">
        <h1 className="title">Aircall Phone</h1>
        {user && (
          <div className="avatar-container">
            <img src={user.avatar} alt="User Avatar" className="avatar" />
            <div className="welcome-container">
              <h3>Welcome</h3>
              <h3 className="user-name"> {user.name} </h3>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
