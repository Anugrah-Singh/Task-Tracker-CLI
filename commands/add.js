const { readData, writeData } = require("../utils/fileHandler");

// Add a new task using the first positional argument as the task text.
module.exports = function (args) {
    const taskText = args[0];

    if (!taskText) {
        console.log("Please provide a task");
        return;
    }

    const data = readData();

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    data.tasks.push(newTask);

    // writeData returns boolean success; report accordingly.
    const success = writeData(data);

    if (success) {
        console.log("Task added!");
    } else {
        console.log("Could not save task");
    }
};