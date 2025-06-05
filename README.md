About This Project
This is a full-featured movie and TV show web application that allows users to discover, explore, and learn more about their favorite titles. It provides detailed insights for each title including high-resolution backdrop images, cast and crew credits, trailers, related content, and additional metadata such as genres, release date, runtime, and ratings.

Built with Next.js App Router, TypeScript, and Tailwind CSS, the app consumes data from The Movie Database (TMDB) API and displays it in a clean, responsive, and engaging layout. It is optimized for fast performance and smooth user experience across all devices.

Features

Dynamic Routing: Each movie or show is accessible via its unique dynamic route (e.g., /movie/12345).
Image Section: Displays a large hero banner, rating badge, and embedded trailer if available.
About Section: Shows title overview, genres, release date, runtime, production info, cast, director, and writers.
Cast Section: Highlights main cast members.
Similar Titles: Lists a curated set of similar shows or movies.
Metadata Display: Includes popularity, status, language, and other TMDB-provided metadata.
Trailer Integration: Embeds the official YouTube trailer dynamically if available.
Loading & Error States: Smooth loading indicators and graceful fallbacks for missing or broken data.

Thech Stack

Next.js (App Router)
TypeScript
Tailwind CSS
TMDB API (for fetching movie/show data)
React Hot Toast (for toast notifications)
React Hooks (for data fetching and state management)
