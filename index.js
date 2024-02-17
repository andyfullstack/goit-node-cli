const Contacts = require("./contact");
const { program } = require("commander");
const fs = require("node:fs/promises");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();

      console.table(contacts);
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      return contact;

    case "add":
      const createdContact = await Contacts.addContact({
        name,
        email,
        phone,
      });
      return createdContact;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return removedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options).then(console.log).catch(console.error);
