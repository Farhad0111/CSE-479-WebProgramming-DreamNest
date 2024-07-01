import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { facilities } from "../data";
import "../styles/ListingDetails.scss";
import { FaRegTrashAlt } from "react-icons/fa";

function ListingDetails() {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const [customerDetail, setCustomerDetail] = useState("");

  async function getCustomerDetail() {
    if (!listing?.isBooked) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/bookings/getCustomer/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setCustomerDetail(data.data);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  }

  // useEffect(() => {
  // }, [listing]);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  useEffect(() => {
    getCustomerDetail();
  }, [listing]);

  //   console.log(listing);

  // ! SUBMIT BOOKING
  const customerId = useSelector((state) => state?.user?._id);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!customerId) {
      navigate("/login");
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        totalPrice: listing.price,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  async function handleDelete() {
    try {
      const res = await fetch(
        `http://localhost:3001/properties/${listingId}/${customerId}`,
        {
          method: "DELETE",
        }
      );

      console.log("DELETE", res);

      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Error while delete: ", err);
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          {customerId === listing?.creator._id || !customerId ? (
            <button className="delete-btn" onClick={handleDelete}>
              <FaRegTrashAlt className="del-icon" />
              Delete
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province}
        </h2>
        <p>
          {listing.guestCount ? listing.guestCount : 1} person(s) -{" "}
          {listing.bedroomCount} bedroom(s) - {listing.bathroomCount}{" "}
          bathroom(s) -{" "}
          {listing.drawingroomCount ? listing.drawingroomCount : 0} drawing -{" "}
          {listing.diningRoom ? listing.diningRoom : 0} dining -{" "}
          {listing.balconyCount ? listing.balconyCount : 0} balcony(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="creator avater"
          />
          <div>
            <h3>
              Hosted by {listing.creator.firstName} {listing.creator.lastName}
            </h3>
            <p>{listing.creator.profession}</p>
          </div>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {!listing.isBooked ? (
              <div className="book-div">
                <h2>
                  ৳{listing.price} <span>per month</span>
                </h2>
                <p>
                  Available from: <span> {listing?.date?.slice(0, 15)}</span>
                </p>

                <button
                  className="button"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={customerId === listing?.creator._id || !customerId}
                  style={
                    customerId === listing?.creator._id || !customerId
                      ? {
                          cursor: "not-allowed",
                        }
                      : {
                          cursor: "pointer",
                        }
                  }
                >
                  Book now
                </button>
              </div>
            ) : (
              <div className="customer">
                <h1>Booked By</h1>
                <div className="customer-box">
                  <img
                    src={`http://localhost:3001/${customerDetail?.profileImagePath?.replace(
                      "public",
                      ""
                    )}`}
                    alt="profile avater"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                  <div className="customer-info">
                    <h2>
                      {customerDetail?.firstName} {customerDetail?.lastName}
                    </h2>
                    <p className="profession">{customerDetail?.profession}</p>
                    <h3>Contact</h3>
                    <p className="email">Email: {customerDetail.email}</p>
                    <p className="phone">Phone: {customerDetail.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ListingDetails;
