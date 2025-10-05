# 📰 React News App

A news web application built with **React + TypeScript**, fetching live news data from the [NewsAPI](https://newsapi.org/).  
It includes features like top headlines, category filtering, search for news, latest news and article bookmarking.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run app

```bash
npm run dev
```

### You can also run tests and coverage with next commands

```bash
npm run test

npm run coverage
```

### Deployment Tip

To quickly preview the app on your phone:

Run npm run dev -- --host

Connect your phone to the same Wi-Fi

Open the shown network IP in your mobile browser

# Design overview

## Tech Stack

React + TypeScript — type safety and component-driven structure

Vite — fast development build tool with hot reloading

React Router — client-side navigation (used via useNavigate and useParams)

Vitest + React Testing Library — unit testing with realistic component rendering

SCSS Modules — clean and scalable styling with BEM conventions

## Design decisions

Each UI part (like NewsBox, SearchResults, NewsItem) is isolated and reusable, improving testability and readability. Each component and service is unit-tested with Vitest.

Used custom hooks and context. Context handle global state (favorites) cleanly without prop drilling.

The Favorites Context is used to manage bookmarked articles across the entire app.
It provides a centralized state for favorite news items so that any component (e.g. NewsItem, FavoritesList, etc.) can easily access or modify the favorites without prop drilling. Multiple components (like the news feed, article view, and favorites page) need to read and update the same favorites list. Using React’s Context API avoids passing favorites and toggleFavorite through many levels of props. Favorites are saved to localStorage, so bookmarks remain available even after page reloads. The logic for adding/removing favorites is encapsulated inside FavoritesProvider. A custom hook (useFavorites) ensures that components can only access this context when wrapped in the provider, preventing usage errors.
