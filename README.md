# Poke Play Collect

Poké Play Collect (aka **PokéLog**) is a small web app that helps you track your Pokémon card collection and the cards you _dream_ of owning.

It’s built as a React single-page application that talks to the **Pokémon TCG API** through a simple local proxy, plus browser `localStorage` for persistence.

---

## ✨ Features

### 🏠 Home – New & Trending Cards

- Shows **newest / trending Pokémon cards** pulled from the Pokémon TCG API.
- Pagination controls to browse multiple pages of cards.
- Click any card to open a **modal** with a larger view and quick actions:
  - **Add to Collection**
  - **Add to Dream List**

If the external API is slow or down, the page shows a friendly error message and the rest of the app (Collection / Dream List / Backup) continues working normally.

---

### 📁 My Cards – Collection

Manage the cards you actually own:

- **Add a card by name**
  - On submit, the app:
    - Looks up the card via the Pokémon TCG API (through the proxy),
    - Fills in the official **image** and **rarity** where possible.
  - If the lookup fails or you want something custom, you can:
    - Manually type the **rarity**,
    - Paste an **image URL** yourself.
- Smart **name autocomplete** using card names fetched from the API.
- Each card tile shows:
  - Card image
  - Name
  - Rarity
  - An **Owned / Missing** toggle badge
- Actions:
  - **Move to Dream List**
  - **Delete**

Cards are stored in `localStorage`, so your collection survives refreshes and browser restarts.

---

### ⭐ Dream List

Track the cards you _want_ but don’t have yet:

- Add cards manually (same form as Collection).
- Mark cards as **Owned / Missing** if you use Dream List as a “wishlist history.”
- Move cards:
  - **Move to Collection** when you finally get the card.
  - **Delete** if you no longer want it on your list.

The Dream List is also persisted in `localStorage`.

---

### 💾 Backup

Keep your progress safe:

- **Export** your current Collection + Dream List as a single JSON file.
- **Import** that JSON later to restore your data (or move it to another browser).

This is implemented completely in the frontend using the browser’s file APIs.

---

## 🧱 Tech Stack

- **Framework:** React + Vite
- **Routing:** `react-router-dom`
- **Styling:** Tailwind CSS + a small custom CSS file
- **State & storage:** React hooks (`useState`, `useEffect`, `useMemo`) + `localStorage`
- **External API:** [Pokémon TCG API](https://pokemontcg.io/)
- **Proxy server:** Small Node/Express server to avoid CORS issues

---

## 🌐 External API & Proxy

Direct calls from the browser to the Pokémon TCG API hit CORS limits, so this project uses a tiny Node proxy:

- Frontend calls:
  - `GET http://localhost:5174/api/tcg/cards?...`
- Proxy forwards that to:
  - `https://api.pokemontcg.io/v2/cards?...`
- Adds the `X-Api-Key` header using your secret key from `.env`.
- Returns the JSON to the React app.

This keeps your API key out of the frontend bundle and bypasses browser CORS restrictions.

Used endpoints (via the proxy):

- **Trending / new cards** for Home:
  - `GET /cards?page=…&pageSize=…&orderBy=-set.releaseDate`
- **Card search by name** for CardForm:
  - `GET /cards?q=name:"<card name>"&pageSize=1`
- **Name suggestions** for autocomplete:
  - `GET /cards?pageSize=250` (first page, then map to unique names)

If the API or proxy responds with errors (like 504 Gateway Timeout), the app:

- Logs the error to the console,
- Shows an inline message on Home like  
  _“Couldn’t load trending cards from the TCG API. You can still use your Collection and Dream List as normal.”_

---

## 🖥 How to run locally

1. Clone the repo and install dependencies:

git clone https://github.com/demarcogray81/poke-play-collect.git
cd poke-play-collect
npm install

2. Create a .env file in the project root with:

VITE_TCG_API_KEY=your_real_pokemontcg_key_here
VITE_TCG_PROXY_BASE=http://localhost:5174/api/tcg/cards


3. Start the Pokémon TCG proxy server (Terminal 1):

npm run proxy


4. Start the React dev server (Terminal 2):

npm run dev


5. Open the app in your browser:

http://localhost:5173

---

## Coming Soon

### Trends Page

A stats-focused page powered by the Pokémon TCG API. Planned features:

- **Newest releases** – show the most recently released sets.
- **High-value cards** – list the most expensive cards in the current Standard format.
- **Popular picks** – highlight the most played / searched Pokémon this month.
- **Top cards by set** – view the top 10 cards from a chosen set.

### Walkthrough / Playthrough Page

A journal-style page that tracks in-game progress using data from [PokéAPI](https://pokeapi.co/). Planned features:

- **Manual progress tracking** – log badges earned, team members, encounters, items, etc.
- **Game-by-game journals** – keep separate logs for different runs or versions.
- **Pokémon lookups** – pull basic Pokémon info from PokéAPI to enrich entries.

### Theme Customization

Add preset visual themes inspired by Pokémon types and items. For example:

- **Fire Theme** – warm reds/oranges, ember-like accents
- **Water Theme** – blues/teals, wave-like gradients
- **Electric Theme** – yellows and sharp contrast for a “spark” feel
- **Poké Ball Theme** – classic red/white/black color scheme
- **Potion Theme** – soft purples/greens with subtle glow effects

Users will be able to pick a theme from a simple menu, and the app’s colors will update automatically

