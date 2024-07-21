import React from "react";

const Greeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return <p className="gradient-text">{getGreeting()}</p>;
};

export default Greeting;
