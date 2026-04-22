module.exports = function (args) {
    const { readData, writeData } = require("../utils/fileHandler");
    const readLine = require("readline");

    const id = args[0];

    if (!id) {
        console.log("Please provide task ID");
        return;
    }

    const data = readData();

    if (!data.tasks || !Array.isArray(data.tasks)) {
        console.log("Data file is corrupted or invalid");
        return;
    }

    const task = data.tasks.find(t => String(t.id) === id);

    if (!task) {
        console.log("Task not Found!");
        return;
    }

    // Use readline to request a confirmation from the user before deleting.
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Are you sure you want to delete "${task.text}"? (y/n): `, (answer) => {
        if (answer.toLowerCase() === "y") {
            data.tasks = data.tasks.filter(t => String(t.id) !== id);
            const success = writeData(data);
            if (success) {
                console.log("Task Deleted");
            } else {
                console.log("Could not delete task");
            }
        } else {
            console.log("Deletion Cancelled");
        }

        // Close the readline interface to restore the terminal state.
        rl.close();
    });
};