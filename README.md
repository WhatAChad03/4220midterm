# 🎮 RAWG Video Games CLI

A Node.js Command Line Interface application that searches for video games using the [RAWG Video Games API](https://rawg.io/apidocs).

---

## Setup

### 1. Get a free RAWG API key
Visit https://rawg.io/apidocs and register for a free API key.

### 2. Add your API key
Open `api.js` and replace the placeholder on line 4:
```js
const API_KEY = "your_api_key_here";
```

### 3. Install dependencies
```bash
npm install
```

---

## Usage

### Help Menu
```bash
node cli.js --help
```

### Search for games by keyword
```bash
node cli.js search zelda
node cli.js search "dark souls"
node cli.js search mario
```
- Displays a selectable list of matching games
- Select a game to view detailed information (rating, platforms, genres, description, etc.)
- Keyword is saved to `search_history.json` if it's new

### View search history
```bash
node cli.js history keywords
```
- Shows all previously searched keywords as a selectable list
- First option is always **Exit** to quit without searching
- Selecting a keyword re-runs that search

---

## Project Structure

| File | Purpose |
|------|---------|
| `cli.js` | Entry point — parses CLI arguments and routes commands |
| `app.js` | Core logic — runs searches, prompts user, displays results |
| `api.js` | API layer — `searchGames(keyword)` and `getGameById(id)` |
| `history.js` | History layer — read/write `search_history.json`, history prompt |
| `search_history.json` | Persisted list of unique searched keywords |
| `package.json` | Project metadata and dependencies |

---

## Dependencies

- [axios](https://github.com/axios/axios) — HTTP requests to the RAWG API
- [inquirer](https://github.com/SBoudrias/Inquirer.js) v8 — Interactive CLI prompts