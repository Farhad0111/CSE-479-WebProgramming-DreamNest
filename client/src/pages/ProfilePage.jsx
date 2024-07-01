import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import "../styles/profile.scss";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { MdEdit } from "react-icons/md";

function ProfilePage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h1>My Profile</h1>

        <div className="container basic">
          <img
            src={`http://localhost:3001/${user.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile"
          />
          <div className="description">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            {/* <Link to={`/${user._id}/profile/edit`} className="edit-btn">
              <MdEdit /> Edit
            </Link> */}
            <p className="profession">{user.profession}</p>
            <p className="about">{user?.about}</p>
          </div>
        </div>

        <div className="container personal">
          <h2>Personal Informations</h2>
          <div className="box">
            <div className="left">
              <p>First name</p>
              <p>Last name</p>
              <p>Profession</p>
              <p>Email</p>
              <p>Phone number</p>
            </div>
            <div className="right">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.profession}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
