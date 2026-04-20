module.exports = function (args) {
    const { readData, writeData } = require("../utils/fileHandler");

    const id = Number(args[0]);
    const status = args[1];

    const data = readData;

    const task = data.tasks.find(t => t.id === id);

    if (!task) {
        console.log("Task not Found!");
        return;
    }

    task.completed = status === "done";

    writeData(data);

    console.log("Task Updated");
};