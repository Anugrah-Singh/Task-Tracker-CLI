const fs = require("fs");
const path = require("path");

// Data file path (stored at repository root as `data.json`)
const filePath = path.join(__dirname, "../data.json");

// Read and return the stored data structure from disk.
// - If the file does not exist, create it with an initial `{ tasks: [] }` structure.
// - If the file contents are invalid, reset to the fallback structure.
// Returns an object with a `tasks` array.
function readData() {
    try {
        // If the file doesn't exist, create it with an empty tasks array.
        if (!fs.existsSync(filePath)) {
            const initialData = { tasks: [] };
            fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
            return initialData;
        }

        // Read and parse existing file.
        const raw = fs.readFileSync(filePath, "utf-8");
        let data = JSON.parse(raw);

        // Enforce a stable structure: ensure `data` is an object and `data.tasks` is an array.
        if (typeof data !== "object" || data === null) {
            data = {};
        }

        if (!Array.isArray(data.tasks)) {
            data.tasks = [];
        }

        return data;
    } catch (err) {
        // On any error, reset the file to a safe default and return it.
        console.log("Error reading data. Resetting file.");
        const fallback = { tasks: [] };
        try {
            fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
        } catch (writeErr) {
            // If write also fails, log and continue returning fallback in-memory.
            console.log("Failed to reset data file:", writeErr.message);
        }
        return fallback;
    }
}

// Write the provided data object to disk synchronously.
// Returns `true` on success, `false` on failure.
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
