# Task Tracker CLI

A minimal command-line task tracker written in Node.js. It stores tasks in a JSON file (`data.json`) in the project root and uses only Node's built-in modules (no external dependencies).

## Requirements

- Node.js (v12+ recommended)

## Quick start

No installation is required. From the project root run commands with `node index.js`.

Examples:

```
node index.js add "Buy groceries"
node index.js list
node index.js list completed
node index.js mark 1612345678901 completed
node index.js delete 1612345678901
```

## Commands

- `add <task text>`
  - Adds a new task. The task text is taken from the first positional argument.
  - Example: `node index.js add "Write unit tests"`

- `list [completed|pending]`
  - Lists tasks. Without a filter it lists all tasks. Use `completed` or `pending` to filter.
  - Example: `node index.js list pending`

- `mark <id> <completed|pending>`
  - Updates the completion state of the task with the given `id`.
  - Example: `node index.js mark 1612345678901 completed`

- `delete <id>`
  - Prompts for confirmation before deleting the task with the given `id`.
  - Example: `node index.js delete 1612345678901`

## Data storage

- Tasks are stored in `data.json` at the project root. The file is automatically created if it does not exist.
- The file structure is a simple object with a `tasks` array, e.g.:

```json
{
  "tasks": [
    { "id": 1612345678901, "text": "Example task", "completed": false }
  ]
}
```

## Implementation notes

- Uses Node built-ins: `fs`, `path`, and `readline`.
- `utils/fileHandler.js` provides `readData()` and `writeData()` helpers. `readData()` creates or resets `data.json` on errors and returns a stable `{ tasks: [] }` structure; `writeData()` returns a boolean indicating success.
- The CLI uses positional command-line arguments (`process.argv`) for simplicity.

## Troubleshooting

- If the CLI prints "Data is corrupted" or similar, `data.json` may contain invalid JSON — the code will reset it to a safe default, but you may want to inspect the file and restore any lost tasks from a backup.
- If writing fails (permission or disk errors), the CLI logs the error message and returns a failure message to the user.

## Contributing

Small fixes and improvements are welcome. Keep changes minimal and preserve the repository's no-dependency goal.

- project url: [text](https://github.com/Anugrah-Singh/Task-Tracker-CLI)

---

Happy tracking.

