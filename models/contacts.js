const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);

  return JSON.parse(list);
};

const updateById = async (id, data) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contact[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact[index];
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((cont) => cont.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deleteContact = contacts.findIndex((cont) => cont.id === contactId);
  if (!deleteContact) {
    return;
  }
  const [result] = contacts.splice(deleteContact, 1);
  console.log("result: ", result);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  contacts.push(newContacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
