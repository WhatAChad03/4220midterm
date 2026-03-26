const { runSearch } = require("./app");
const { showHistory } = require("./history");

const VALID_HISTORY_ARGS = ["keywords"];

/**
 * Prints the help menu to the console.
 */
const printHelp = () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║              🎮  RAWG Video Games CLI  🎮                ║
║          Search and explore games from RAWG.io           ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  USAGE                                                   ║
║    node cli.js <command> [argument]                      ║
║                                                          ║
║  COMMANDS                                                ║
║                                                          ║
║  --help                                                  ║
║    Display this help menu.                               ║
║    Example: node cli.js --help                           ║
║                                                          ║
║  search <keyword>                                        ║
║    Search for video games matching the keyword.          ║
║    Shows an interactive list of results to pick from,   ║
║    then displays detailed info for the selected game.   ║
║    Example: node cli.js search zelda                     ║
║    Example: node cli.js search "dark souls"              ║
║                                                          ║
║  history keywords                                        ║
║    View all previously searched keywords.                ║
║    Select a keyword to run a new search, or             ║
║    choose "Exit" to quit the application.               ║
║    Example: node cli.js history keywords                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);
};

/**
 * Main CLI entry point.
 * Parses process.argv and routes to the correct command handler.
 */
const main = async () => {
  const args = process.argv.slice(2); // Strip "node" and "cli.js"
  const command = args[0];
  const argument = args[1];

  if (!command || command === "--help") {
    printHelp();
    return;
  }

  if (command === "search") {
    if (!argument) {
      console.log('\n  ⚠️  Please provide a search keyword.\n  Usage: node cli.js search <keyword>\n');
      return;
    }
    await runSearch(argument);
    return;
  }

  if (command === "history") {
    if (!argument || !VALID_HISTORY_ARGS.includes(argument)) {
      console.log(
        `\n  ⚠️  Invalid argument for "history". Valid options: ${VALID_HISTORY_ARGS.join(", ")}\n  Usage: node cli.js history keywords\n`
      );
      return;
    }
    // "keywords" argument: show keyword history and allow re-searching
    await showHistory(runSearch);
    return;
  }

  // Unknown command fallback
  console.log(`\n  ⚠️  Unknown command: "${command}"\n  Run "node cli.js --help" to see available commands.\n`);
};

main();