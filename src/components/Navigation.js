import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink exact="true" to="/">
        Acceuil
      </NavLink>
      <NavLink exact="true" to="/news">
        News
      </NavLink>
      <NavLink exact="true" to="/About">
        About
      </NavLink>
    </div>
  );
};

export default Navigation;
