import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsView.css";
import { ref, get } from "firebase/database";
import database from "../firebase";

const DetailsView = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Create a reference to the user's data in the database
    const userRef = ref(database, `contacts/${id}`);

    // Fetch user details from the database
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Data exists, so set the user state
          const userData = snapshot.val();
          setUser(userData);
        } else {
          // Data doesn't exist, handle as needed (e.g., show a message)
          setUser({});
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <strong>Address: </strong>
          <span>{user.address}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit" style={{ width: "100%" }}>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
