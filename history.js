const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const HISTORY_FILE = path.join(__dirname, "search_history.json");

/**
 * Reads the keyword history from search_history.json.
 * Returns an empty array if the file does not exist or is malformed.
 * @returns {string[]} - Array of previously searched keywords.
 */
const readHistory = () => {
  try {
    if (!fs.existsSync(HISTORY_FILE)) return [];
    const raw = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

/**
 * Saves a keyword to search_history.json only if it is not already present.
 * @param {string} keyword - The keyword to save.
 */
const saveKeyword = (keyword) => {
  const history = readHistory();
  const normalized = keyword.trim().toLowerCase();
  if (!history.includes(normalized)) {
    history.push(normalized);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  }
};

/**
 * Displays a list prompt of previously searched keywords.
 * The first option is always "Exit". If the user selects a keyword,
 * it triggers a new search using that keyword via the provided callback.
 * @param {Function} onKeywordSelected - Callback invoked with the selected keyword.
 */
const showHistory = async (onKeywordSelected) => {
  const history = readHistory();

  if (history.length === 0) {
    console.log("\n  No search history found.\n");
    return;
  }

  const choices = ["Exit", ...history];

  const { selectedKeyword } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedKeyword",
      message: "Your search history — select a keyword to search again:",
      choices,
    },
  ]);

  if (selectedKeyword === "Exit") {
    console.log("\n  Goodbye!\n");
    process.exit(0);
  }

  await onKeywordSelected(selectedKeyword);
};

module.exports = {
  readHistory,
  saveKeyword,
  showHistory,
};