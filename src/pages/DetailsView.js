import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsView.css";
import { ref, get } from "firebase/database";
import database from "../firebase";

const DetailsView = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const userRef = ref(database, `contacts/${id}`);

    // Fetch user details from the database
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
        } else {
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
          <strong>Age: </strong>
          <span>{user.age}</span>
          <br />
          <br />
          <strong>Gender: </strong>
          <span>{user.gender}</span>
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
