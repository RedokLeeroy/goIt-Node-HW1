const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const filteredContact = contacts.find(({ id }) => id === contactId);
  return filteredContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactDelete = contacts.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactDelete));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const userId = contacts.map((item) => +item.id);
  const newContact = {
    id: String(Math.max(...userId) + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
