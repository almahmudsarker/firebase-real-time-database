import React, { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import database from "../firebase";
import "./Home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const databaseRef = ref(database, "contacts");

    get(databaseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataSnapshot = snapshot.val();
          const dataObject = {};

          if (dataSnapshot) {
            Object.keys(dataSnapshot).forEach((key) => {
              dataObject[key] = dataSnapshot[key];
            });
          }
          setData(dataObject);
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this contact from your list?"
      )
    ) {
      const databaseRef = ref(database, `contacts/${id}`);

      remove(databaseRef)
        .then(() => {
          toast.success("Contact deleted successfully!");
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => (
            <tr key={id}>
              <th scope="row">{index + 1}</th>
              <td>{data[id].name}</td>
              <td>{data[id].email}</td>
              <td>{data[id].contact}</td>
              <td>{data[id].address}</td>
              <td>
                <Link to={`/update/${id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick={() => onDelete(id)}>
                  Delete
                </button>
                <Link to={`/view/${id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
