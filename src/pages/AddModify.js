import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, push, get, set } from "firebase/database";
import "./AddModify.css";
import { useEffect } from "react";
import database from "../firebase";

const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
};

const AddModify = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { name, email, contact, address } = state;
  const [data, setData] = useState({});
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const databaseRef = ref(database, "contacts");

    if (!state.name || !state.email || !state.contact || !state.address) {
      toast.error("Please provide a value for all fields");
    } else {
      if (id) {
        // Editing an existing user
        const userRef = ref(databaseRef, id);

        set(userRef, state)
          .then(() => {
            toast.success("Contact updated successfully");
            setState(initialState);
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        // Adding a new user
        push(databaseRef, state)
          .then(() => {
            toast.success("Contact added successfully");
            setState(initialState);
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    }
  };

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name || ""}
          onChange={handleInputChange}
          placeholder="Enter Your name"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email || ""}
          onChange={handleInputChange}
          placeholder="Enter Your email"
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          name="contact"
          id="contact"
          value={contact || ""}
          onChange={handleInputChange}
          placeholder="Enter Your contact"
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address || ""}
          onChange={handleInputChange}
          placeholder="Enter Your address"
        />

        <input type="submit" value={id ? "update" : "save"} />
      </form>
    </div>
  );
};

export default AddModify;
