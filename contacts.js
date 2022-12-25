const { readFile, writeFile} = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/", "contacts.json");

function listContacts() {
  readFile(contactsPath, "utf-8")
    .then(console.log)
    .catch((err) => console.error(err))
}

function getContactById(contactId) {
  readFile(contactsPath, "utf-8")
    .then((data) =>
      JSON.parse(data).find(
        (contact) => Number(contact.id) === Number(contactId)
      )
    )
    .then(console.log)
    .catch((err) => console.error(err));
}

function removeContact(contactId) {
  readFile(contactsPath, "utf-8")
    .then((data) => {
      const isContactExist = !!JSON.parse(data).find(
        (contact) => Number(contact.id) === Number(contactId)
      );
      if (!isContactExist) {
        console.log("this contact does not exist");
        return;
      }
      const filteredContacts = JSON.parse(data).filter((contacts) => {
        const noMatches = contact.id === Number(contactId);
        return Number(contact.id) !== Number(contactId);
      });
      const contactsJson = JSON.stringify(filteredContacts);
      writeFile(contactsPath, contactsJson);
      console.log("contact removed");
  });
}

function addContact(name, email, phone) {
  readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const id = String(contacts.length + 1);
      const newContact = {
        id,
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      writeFile(contactsPath, JSON.stringify(contacts));
      console.log("Contact created");
    })
    .catch((err) => console.error(err));
}

module.exports = { listContacts, getContactById, removeContact, addContact };