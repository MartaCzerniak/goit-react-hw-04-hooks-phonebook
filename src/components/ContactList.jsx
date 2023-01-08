import { render } from "@testing-library/react";
import { nanoid } from "nanoid";
import Button from "./Button";
function ContactList({ contactList, filterInputValue, onClick }) {
  let contacts = contactList
    .filter((contact) =>
      contact.name.toLowerCase().includes(filterInputValue.toLowerCase())
    )
    .map((contact) => (
      <li key={nanoid()}>
        {contact.name}:{contact.number}
        <Button
          type="button"
          label="Delete"
          onClick={() => onClick(contact.id)}
        />
      </li>
    ));

  return contacts;
}

export default ContactList;
