const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data.json");

function readData() {
    try {
        //if file doesn't exist -> create it
        if (!fs.existsSync(filePath)) {
            const initialData = { tasks: [] };
            fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
            return initialData;
        }
        const raw = fs.readFileSync(filePath, "utf-8");
        let data = JSON.parse(raw);

        //enforce strusture
        if (typeof data !== "object" || data === null) {
            data = {};
        }
        
        if (!Array.isArray(data.tasks)) {
            data.tasks = [];
        }

        return data

    } catch (err) {
        console.log("Error reading data. Resetting file.");
        
        const fallback = { tasks: [] };
        fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
        return fallback;
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.log("Failed to write data:", err.message);
        return false;
    }
}

module.exports = { readData, writeData };
