import { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import "../styles/profileEdit.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";

function ProfileEdit() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    profession: user?.profession,
    about: user?.about,
    profileImage: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (let key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch(`http://localhost:3001/users/${user._id}`, {
        method: "PATCH",
        body: register_form,
      });

      const data = await response.json();

      if (data) {
        dispatch(
          setLogin({
            user: data.user,
          })
        );
        navigate(`/${user._id}/profile`);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h1>Edit Profile</h1>

        <div className="profile">
          <form onSubmit={handleSubmit}>
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image">
              <img
                src={
                  formData.profileImage
                    ? URL.createObjectURL(formData.profileImage)
                    : `http://localhost:3001/${user.profileImagePath.replace(
                        "public",
                        ""
                      )}`
                }
                alt="avatar"
              />
            </label>

            <div className="user-detail">
              <input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                required
              />
              <input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                required
              />
              <input
                placeholder="Last Name"
                name="lastName"
                value={user.email}
                disabled
                type="text"
                required
              />
              <textarea
                placeholder="About You"
                name="about"
                value={formData.about}
                onChange={handleChange}
                type="text"
                required
              />
              <input
                placeholder="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                type="text"
                required
              />
              <input
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
              />
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
