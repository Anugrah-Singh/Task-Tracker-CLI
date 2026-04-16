const { readData, writeData } = require("../utils/fileHandler");

module.exports = function (args) {
    const data = readData();

    if (!data || !Array.isArray(data.tasks)) {
        console.log("Invalid data Format");
        return;
    }

    if (data.tasks.length === 0) {
        console.log("No tasks Found");
        return;
    }

    console.log("Your Tasks: ");

    data.tasks.forEach((task) => {
        console.log(
            `${task.id} | ${task.completed ? "Done" : "Pending"} | ${task.text}`
        );
    });

};