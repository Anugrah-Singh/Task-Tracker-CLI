module.exports = function (args) {
    const { readData, writeData } = require("../utils/fileHandler");

    const id = args[0];
    const status = args[1];

    const data = readData();

    if (!data.tasks || !Array.isArray(data.tasks)) {
        console.log("Data is corrupted");
        console.log(data);
        return;
    }

    //this is o(n) every time will update it later
    const task = data.tasks.find(t => String(t.id) === id); 
    
    if (!task) {
        console.log("Task not Found!");
        return;
    }
    const validStatuses = ["completed", "pending"];

    if (!validStatuses.includes(status)) {  // validate before processing
        console.log("Invalid status. Use 'completed' or 'pending' "); 
        return;
    }

    task.completed = status === "completed";

    const success = writeData(data);

    if (success) {
        console.log("Task updated!");
    } else {
        console.log("Could not update task");
    }
};