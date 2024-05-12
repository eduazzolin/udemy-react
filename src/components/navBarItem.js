import React from "react";
import { Link } from 'react-router-dom';

function NavBarItem({render, ...props}) {
  if (render) {
    return (
      <li className="nav-item">
        <Link className="nav-link" onClick={props.onClick} to={props.to}>{props.label}</Link>
      </li>
    )
  } else {
    return false;
  }
}

export default NavBarItem;