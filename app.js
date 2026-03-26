const inquirer = require("inquirer");
const { searchGames, getGameById } = require("./api");
const { saveKeyword } = require("./history");

/**
 * Formats and displays detailed game information in a readable format.
 * @param {Object} game - The detailed game object returned from the RAWG API.
 */
const displayGameDetails = (game) => {
  const genres = game.genres?.map((g) => g.name).join(", ") || "N/A";
  const platforms =
    game.platforms?.map((p) => p.platform.name).join(", ") || "N/A";
  const developers = game.developers?.map((d) => d.name).join(", ") || "N/A";
  const publishers = game.publishers?.map((p) => p.name).join(", ") || "N/A";
  const tags =
    game.tags
      ?.slice(0, 5)
      .map((t) => t.name)
      .join(", ") || "N/A";

  console.log(`
┌─────────────────────────────────────────────────────┐
  🎮  ${game.name}
├─────────────────────────────────────────────────────┤
  📅 Released       : ${game.released || "Unknown"}
  ⭐ RAWG Rating    : ${game.rating ?? "N/A"} / 5  (${game.ratings_count ?? 0} ratings)
  🏆 Metacritic     : ${game.metacritic ?? "N/A"}
  🎭 Genres         : ${genres}
  🖥️  Platforms      : ${platforms}
  🏢 Developers     : ${developers}
  📦 Publishers     : ${publishers}
  🏷️  Tags           : ${tags}
  🌐 Website        : ${game.website || "N/A"}
├─────────────────────────────────────────────────────┤
  📝 Description:
${
  game.description_raw
    ? game.description_raw.slice(0, 400).replace(/\n/g, " ") + "..."
    : "  No description available."
}
└─────────────────────────────────────────────────────┘
`);
};

/**
 * Runs the full search flow:
 *  1. Searches the RAWG API with the provided keyword.
 *  2. Saves the keyword to history (if unique).
 *  3. Presents an interactive list of results.
 *  4. Fetches and displays detailed data for the selected game.
 * @param {string} keyword - The search term entered by the user.
 */
const runSearch = async (keyword) => {
  try {
    console.log(`\n  🔍 Searching for "${keyword}"...\n`);
    const results = await searchGames(keyword);

    if (!results || results.length === 0) {
      console.log(`  No games found for "${keyword}". Try a different keyword.\n`);
      return;
    }

    // Save keyword to history only after a successful search
    saveKeyword(keyword);

    // Build clean list choices from results
    const choices = results.map((game) => ({
      name: `${game.name}  (Released: ${game.released || "Unknown"} | Rating: ${
        game.rating ?? "N/A"
      }/5)`,
      value: game.id,
    }));

    const { selectedId } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedId",
        message: `Found ${results.length} game(s). Select one for details:`,
        choices,
        pageSize: 10,
      },
    ]);

    console.log("\n  ⏳ Fetching game details...");
    const gameDetails = await getGameById(selectedId);
    displayGameDetails(gameDetails);
  } catch (error) {
    if (error.response) {
      console.error(
        `\n  API Error ${error.response.status}: ${error.response.data?.detail || error.message}\n`
      );
    } else {
      console.error(`\n  Error: ${error.message}\n`);
    }
  }
};

module.exports = { runSearch };