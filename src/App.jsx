import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import { useState } from "react";
import { useEffect } from "react";

const App = (props) => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilterContactsValue] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;
    console.log(name, number);
    const contact = { id: nanoid(), name: name, number: number };
    const foundContant = contacts.find((contact) => contact.name === name);
    const alertMessage = name + "is already in contacts.";
    if (foundContant) {
      return alert(alertMessage);
    } else {
      setContacts([contact, ...contacts]);
    }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "filter") setFilterContactsValue(value);
  };
  const deleteContact = (key) => {
    setContacts(contacts.filter((contact) => contact.id !== key));
  };
  return (
    <div>
      <ContactForm handleSubmit={handleSubmit} />
      <Filter handleChange={handleChange} filterInputValue={filter} />
      <ContactList
        contactList={contacts}
        filterInputValue={filter}
        onClick={deleteContact}
      />
    </div>
  );
};

export default App;
