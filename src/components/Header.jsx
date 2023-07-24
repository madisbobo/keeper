import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <NavLink to="/">
        <div className="logo-container">
          <FormatListBulletedIcon className="logo" />
          <h1>Keeper</h1>
        </div>
      </NavLink>
      <nav>
        <NavLink to="/"><h3>Home</h3></NavLink>
        <NavLink to="/about"><h3>About</h3></NavLink>
      </nav>
    </header>
  );
}

export default Header;
