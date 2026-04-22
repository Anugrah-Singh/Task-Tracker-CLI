const { readData, writeData } = require("../utils/fileHandler");

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

    const success = writeData(data);

    if (success) {
        console.log("Task added!");
    } else {
        console.log("Could not save task");
    }
}