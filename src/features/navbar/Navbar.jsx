import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogout } from "../user/userSlice";

export default function Navbar() {
  const isLogged = useSelector((state) => state.user.loggedIn);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div>
      <nav>
        <ul className="list">
          <li className="element">
            <NavLink exact to="/tweets" activeClassName="active">
              Tweets
            </NavLink>
          </li>
          {!isLogged && (
            <>
              <li className="element">
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li className="element">
                <NavLink to="/signup" activeClassName="active">
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {isLogged && (
            <>
              <li className="element">
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  activeClassName="active"
                >
                  Logout
                </NavLink>
              </li>
              <li className="element">
                <NavLink to="/new-tweet" activeClassName="active">
                  New Tweet
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
