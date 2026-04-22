// Only need to read stored tasks for listing.
const { readData } = require("../utils/fileHandler");

module.exports = function (args) {
    const data = readData();

    if (!data.tasks || !Array.isArray(data.tasks)) {
        console.log("Data is corrupted");
        return;
    }

    const filter = args[0];

    //validate the filters first0
    const validFilters = ['completed', 'pending'];

    if (filter && !validFilters.includes(filter)) {
        console.log("Invalid filter. Use 'completed' or 'pending' ");
        return;
    }

    let tasks = data.tasks;

    if (filter === "completed") {
    // Print a simple header and tabular view of tasks.
    console.log("\nTasks:\n");
    } else if (filter === "pending") {
    // Map tasks to a shape suitable for console.table.
        tasks = tasks.filter(task => !task.completed);
    }

    if (tasks.length === 0) {
        console.log("No tasks found");
        return;
    }

    console.log("\n📋 Tasks:\n");

    console.table(
        tasks.map(task => ({
            ID: task.id,
            Status: task.completed ? "Completed" : "Pending",
            Task: task.text
        }))
    );
};