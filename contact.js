const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contact.json");
// console.log(contactsPath);

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  // console.log(data, typeof data);

  return JSON.parse(data); // или   // return data;
}

function writeFile(contact) {
  // console.log(books, typeof books);

  return fs.writeFile(contactsPath, JSON.stringify(contact, undefined, 3));
}

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactById(id) {
  const contacts = await readFile();
  const contact = contacts.find(contact => contact.id === id);
  return contact;
}

async function addContact(contact) {
  const contacts = await readFile();

  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);
  await writeFile(contacts);

  return newContact;
}

async function removeContact(id) {
  const contacts = await readFile();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  const deletedContact = contacts[index];

  contacts.splice(index, 1);

  await writeFile(contacts);

  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
