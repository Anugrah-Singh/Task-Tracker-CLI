const { readData, writeData } = require("../utils/fileHandler");

module.exports = function (args) {
    const data = readData();

    const filter = args[0];

    let tasks = data.tasks;

    if (filter === "completed") {
        tasks = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
        tasks = tasks.filter(task => !task.completed);
    }

    if (tasks.length === 0) {
        console.log("No tasks found");
        return;
    }

    console.log("Tasks:\n");

    tasks.forEach(task => {
        console.log(
            `${task.id} | ${task.completed ? "Completed" : "Not Completed"} | ${task.text}`
        );
    });
};