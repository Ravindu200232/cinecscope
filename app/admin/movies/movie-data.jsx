import { db } from "@/lib/db";
import React from "react";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    const movies = await db.collection("movies").find({}).limit(50).toArray();

    if(movies.length > 0){
        const refinedMovies = movies.map((movie,key)=>({
            id: key+1,
            title : movie.title,
            year: movie.year,
            genre: movie.genre,
            rating : movie.rating,
            poster : movie.poster,
            runtime : movie.runtime,
            status : movie.status,
            imdb : movie.imdb
        }));

        return <MovieTable movies={refinedMovies}/>

    }else{
        throw new Error(
            "No movies found in the database"
        )
    }
  } catch (error) {
    console.log("Error fetching movies:", error);
    return(
        <div className="flex justify-center items-center h-[400px]">
            <p className="text-destructive font-medium animate-pulse duration-1000">
                No Movies Available!
            </p>
        </div>
    )
  }
}
