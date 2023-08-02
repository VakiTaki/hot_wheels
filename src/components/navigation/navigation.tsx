import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";

function Navigation() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between">
      {routes.map((route, ind) => {
        if (route.display === true) {
          return (
            <NavLink to={route.path} key={ind} className="mx-3">
              {route.title}
            </NavLink>
          );
        }
        return null;
      })}
    </nav>
  );
}

export default Navigation;
