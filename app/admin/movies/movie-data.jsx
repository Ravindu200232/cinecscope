// app/admin/movies/movie-data.jsx

import { db } from "@/lib/db";
import MovieTable from "./movie-table";
import { searchMovies } from "@/actions/movies";

export default async function MovieData({ query = "" }) {
  try {
    let movies = [];

    // If query exists, try to search first
    if (query) {
      const { data = [] } = await searchMovies(query);
      movies = data;
    }

    // Fallback: fetch all if query empty or no results
    if (!movies.length) {
      movies = await db.collection("movies").find({}).limit(50).toArray();
    }

    if (!movies.length) {
      throw new Error("No movies found in the database.");
    }

    const refinedMovies = movies.map((movie) => ({
      id: movie._id.toString(),
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      director: movie.director,
      overview: movie.overview,
      rating: movie.rating,
      poster: movie.poster,
      backdrop: movie.backdrop,
      runtime: movie.runtime,
      status: movie.status,
      imdb: movie.imdb,
    }));

    return <MovieTable movies={refinedMovies} />;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-destructive font-medium animate-pulse duration-1000">
          No Movies Available!
        </p>
      </div>
    );
  }
}
