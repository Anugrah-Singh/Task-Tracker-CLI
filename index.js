// Simple CLI dispatcher: uses the command name from argv[2]
// and passes the remaining positional args to each command handler.
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case "add":
    require("./commands/add")(args);
    break;

  case "list":
    require("./commands/list")(args);
    break;

  case "delete":
    require("./commands/delete")(args);
    break;

  case "mark":
    require("./commands/mark")(args);
    break;

  default:
    console.log("Unknown command");
}