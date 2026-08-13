<h1 align="center">Movie Platform 🎬</h1>

<p align="center">
  A full-stack movie platform for discovering, searching and saving movies.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-000000?style=flat&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white">
</p>

---

## 📖 About the Project

Movie Platform is a full-stack web application for discovering, searching,
filtering and saving movies.

The platform provides movie collections, personalized recommendations,
watch lists, watched movies and premium statistics.

The application is divided into two separate parts:

- **Frontend** — Next.js, React and TypeScript
- **Backend** — Node.js / NestJS REST API

Authentication is implemented using **JWT tokens**. Users can browse movies
without authentication, while additional personalized features are available
after signing in.

---

## 🛠️ Technologies

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Redux Toolkit
- Redux Persist
- TanStack Query
- React Hook Form
- Zod
- Axios
- Recharts
- Embla Carousel
- Day.js
- Sonner

### Development Tools

- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint

---

## ✨ Features

### 🏠 Home

The home page contains several movie collections:

- Upcoming Movies
- Search by Genres
- Top Rated Movies
- Now Playing
- Trending
- My Watch List
- Seen Movies

Movie lists support **infinite scrolling**, allowing users to automatically
load additional movies while scrolling.

The personalized sections are available only to authenticated users.

---

### 🔎 Search & Filters

Users can search for movies by their full or partial title.

The search page provides:

- Movie search
- Pagination
- Sorting
- Genre filtering
- Release year filtering
- Rating filtering

Available sorting options:

- Popularity
- Rating
- Title
- Oldest
- Newest

Filters can be applied, reset or closed without leaving the search page.

---

### 🎯 Movie Match

Movie Match provides personalized movie recommendations.

Users are presented with movies and can:

- 👍 Approve a movie
- 👎 Reject a movie

After evaluating the presented movies, users can request the next
recommendations.

The recommendation system adapts to the user's preferences.

Movie Match is available to authenticated users.

---

### 👤 Profile

The profile page provides a personal space for managing saved movies.

Users can:

- Add movies to their Watch List
- Add movies to Seen Movies
- Remove saved movies
- Browse their personal movie collections

The profile also includes personalized movie statistics.

---

### 📊 Premium Statistics

Premium users get access to detailed statistics about their movie activity.

Statistics include:

- Genre distribution
- Movie-related charts
- Circular and radial charts
- Personal viewing statistics

Statistics are implemented using **Recharts**.

Users without an active premium subscription are shown a subscription
modal when attempting to access premium statistics.

---

### 🔐 Authentication

The application supports:

- User registration
- User login
- JWT-based authentication
- Protected routes
- Token persistence
- Authentication state management
- Automatic token refresh

Public and private sections of the application are separated using
dedicated providers.

---

### 📱 Responsive Design

The application is designed to work across different screen sizes:

- Desktop
- Tablet
- Mobile

The interface is built using responsive layouts and reusable UI components.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sergittko/movie-platform-frontend.git
cd movie-platform-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production build

```bash
npm run build
```

Creates an optimized production build.

### Production

```bash
npm run start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Runs ESLint and automatically fixes available issues.

### Format

```bash
npm run format
```

Formats the project using Prettier.

### Check formatting

```bash
npm run format:check
```

Checks whether the project follows the configured Prettier rules.

---

## 🔧 Code Quality

The project uses several tools to maintain code quality and consistency:

- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Conventional Commits

Git hooks automatically run validation and formatting before commits.

---

## 🌐 Live Demo

[Movie Platform](https://movie-platform-frontend-henna.vercel.app/)

---

## 🎬 Preview of application

<p align="center">
<img width="700" alt="image_1" src="https://github.com/user-attachments/assets/1dd2682f-53a8-4621-b246-e96be8a1e789" />
</p>

<p align="center">
<img width="700" alt="image_2" src="https://github.com/user-attachments/assets/3e1d5cbd-c621-4fc2-b181-060fe2581332" />
</p>

<p align="center">
<img width="700" alt="image_3" src="https://github.com/user-attachments/assets/6019562f-7ef5-40ef-8994-8817f3deeb0e" />
</p>

<p align="center">
<img width="700" alt="image_4" src="https://github.com/user-attachments/assets/f7b01e16-c72d-4800-af5f-232a3139e4e2" />
</p>


---

<p align="center">
  Done by <b>Sergio Diorov</b>
</p>

