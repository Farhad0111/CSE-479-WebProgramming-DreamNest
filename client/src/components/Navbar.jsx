import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Person, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { setLogout } from "../redux/state";
import "../styles/Navbar.scss";
import variables from "../styles/variables.scss";

function Navbar() {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <a className="logo" href="/">
        {/* <img src="/assets/logo.png" alt="logo" /> */}
        <span className="dream">Dream</span>
        <span className="nest">Nest</span>
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {
              navigate(`/properties/search/${search}`);
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile avater"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/profile`}>Profile</Link>
            <Link to={`/${user._id}/trips`}>Bookings</Link>
            <Link to={`/${user._id}/wish-list`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            {/* <Link to={`/${user._id}/reservations`}>Reservation List</Link> */}
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
              style={{ color: "#F8395A" }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
