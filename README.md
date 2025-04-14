# Movie Finder App

![Movie Finder App](src/assets/images/hero.png)

## Live Site

[Click here to see deployed site](https://peter-search-movie.netlify.app/)

## Video Showcase

[YouTube](https://youtu.be/GRcRtumPWPk)

## Description
The **Movie Finder App** is a web application that enables users to search for movies and view trending films. It integrates with [The Movie Database (TMDB) API](https://www.themoviedb.org/) to fetch movie details and uses [Appwrite](https://appwrite.io/) as the backend for managing trending search data.

---

## Features
1. **Movie Search**: Search for movies by title.
2. **Trending Movies**: Display the top 5 trending movies based on search activity.
3. **Dynamic Search Requests**: Debouncing reduces API calls while typing in the search bar.
4. **Detailed Movie Information**:
   - Title
   - Poster
   - Rating
   - Release Year
   - Language
5. **Fallback Handling**:
   - Default image displayed for movies without a poster.
6. **Error Display**:
   - Informative messages shown to users for API or data retrieval errors.

---

## Tech Stack
**Frontend**:
- React with Hooks
- CSS (Tailwind for utility classes)

**Backend**:
- [Appwrite](https://appwrite.io/) for database operations.

**APIs**:
- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data.

---

## Prerequisites
Ensure the following are installed or set up before proceeding:
- **Node.js** (v14+ recommended)
- **npm** or **yarn** for dependency management
- TMDB account for an API key
- Appwrite project with:
  - A **database** created
  - A **collection** containing fields:
    - `searchTerm` (string)
    - `count` (integer)
    - `movie_id` (string)
    - `poster_url` (string)

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/peterkahumu/movie-finder-app.git
   cd movie-finder-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add the environment variables:
   ```
   VITE_TMDB_API_KEY=<Your TMDB API Key>
   VITE_APPWRITE_DATABASE_ID=<Your Appwrite Database ID>
   VITE_APPWRITE_COLLECTION_ID=<Your Appwrite Collection ID>
   VITE_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. Open the app in your browser at:
   ```
   http://localhost:5173
   ```

---

## Project Structure
```
src/
├── assets/
│   └── images/             # Folder containing static images
├── components/             # Reusable React components
├── App.jsx                 # Main application logic
├── Appwrite.jsx            # Appwrite helper functions
├── index.jsx               # Entry point
├── styles.css              # Custom CSS (if applicable)
└── ...
```

---

## Usage

### Searching for Movies
- Enter a movie title in the search bar to fetch results from TMDB.
- Debouncing ensures efficient API calls without flooding the endpoint.
- Search updates the database with the term, tracking its popularity.

### Viewing Trending Movies
- The "Trending Movies" section shows the top 5 most-searched movies.
- Rankings are determined by the number of user searches for each movie.

---

## Key Functions

### `updateSearchCount(searchTerm, movie)`
- Queries the database for an existing `searchTerm`.
- If found, increments the `count` field.
- If not found, creates a new document with search term details.

### `getTrendingMovies()`
- Fetches the top 5 most-searched movies from the Appwrite database.
- Returns the trending movies sorted by `count` in descending order.

### `fetchMovies(query)`
- Fetches movie details from TMDB based on the user’s query.
- Updates the database with the most relevant movie for the query.

---

## Error Handling
1. **Search Errors**:
   - Displays "Error fetching movies. Please try again later." if the TMDB API call fails.
2. **Trending Movies Errors**:
   - Displays "An error occurred while fetching trending movies." if the Appwrite database query fails.
3. **Fallback Image**:
   - Movies without a poster use a default image located in the `images/` folder.

---

## Future Improvements
1. Add movie categories (genres) to cards.
2. Implement pagination or infinite scroll for search results.
3. Create a favorites or bookmark feature for users.

---

## Contribution
Contributions are welcome! Fork the repository and submit a pull request. For major changes, please open an issue to discuss proposed updates.

---

## License
This project is licensed under the MIT License. See the [License](license) file for more details.

## Credits
This project was part of an online tutorial by Javascript Mastery YouTube channel. See the full tutorial [here](https://www.youtube.com/watch?v=dCLhUialKPQ) 