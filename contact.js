const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contact.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

function writeFile(contact) {
  return fs.writeFile(contactsPath, JSON.stringify(contact, undefined, 3));
}

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactBy(id, name, email) {
  const contacts = await readFile();
  const contact = contacts.find(
    contact =>
      contact.id === id || contact.name === name || contact.email === email
  );

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
  getContactBy,
  addContact,
  removeContact,
};
