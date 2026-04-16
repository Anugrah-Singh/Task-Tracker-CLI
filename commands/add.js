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

    writeData(data);

    console.log("Task added!");
}