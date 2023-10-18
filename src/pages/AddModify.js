import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, push, set, get, remove } from "firebase/database";
import "./AddModify.css";
import App from "../firebase";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const databaseRef = ref(App, "contacts");

    if (!state.name || !state.email || !state.contact || !state.address) {
      toast.error("Please provide a value for all fields");
    } else {
      push(databaseRef, state, (error) => {
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Contact added successfully");
          setState(initialState);
          navigate("/");
        }
      });
    }
  };

  // useEffect(() => {
  //   // If you need to load and edit an existing contact, you can do so here.
  //   // For example, if you want to edit a contact with a specific key, you can retrieve it and update the state.
  //   // const contactKey = 'YOUR_CONTACT_KEY';
  //   // const contactRef = ref(App, `contacts/${contactKey}`);
  //   // get(contactRef).then((snapshot) => {
  //   //   if (snapshot.exists()) {
  //   //     setState(snapshot.val());
  //   //   } else {
  //   //     console.error('Contact not found');
  //   //     // Handle error or navigate to an error page.
  //   //   }
  //   // });
  // }, []);

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
          value={name}
          onChange={handleInputChange}
          placeholder="Enter Your name"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter Your email"
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          name="contact"
          id="contact"
          value={contact}
          onChange={handleInputChange}
          placeholder="Enter Your contact"
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Your address"
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddModify;
