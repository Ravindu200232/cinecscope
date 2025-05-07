import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { MOVIES } from "@/lib/data";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { getMovies } from "@/actions/movies";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default async function MoviesList() {
  const movies = await getMovies();

  if (!movies) {
    return <div>No movies found</div>;
  }

  console.log(movies);

  return (
    <div className="space-y-6">
      <div className="border-primary/20 bg-card shadow-xs rounded-lg border p-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="text-primary/70 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            {/* chat cn input field */}
            <Input
              placeholder="Search movies and title or director"
              className="border-primary/20 pl-9"
            />
          </div>
        </div>
      </div>
      {/* Movies Card Here */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Loop Movies */}
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <Card className="border-primary/20 hover:border-primary/50 overflow-hidden py-0 transition-colors">
                <div className="aspect-2/3 w-full overflow-hidden">
                  <Image
                    width={300}
                    height={450}
                    src={movie.poster || "./placeholder.svg"}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="line-clamp-1 font-semibold text-xl ">
                    {movie.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {movie.year} • {movie.runtime} min
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {movie.genre.slice(0, 2).map((genre, index) => (
                      <Badge
                        key={`${genre}-${index}`}
                        variant="outline"
                        className="border-primary/30 bg-primary/5 text-xs"
                      >
                        {genre}
                      </Badge>
                    ))}

                    {movie.genre?.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{movie.genre.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="relative">
                  <div className="absolute left-0 bottom-0 p-3">
                    <span className="text-primary text-sm font-medium">{movie?.rating}/10</span>
                  </div>
                  <Button variant="ghost" size="sm" className="hove:text-primary absolute right-0 bottom-0 m-1">Detains</Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
