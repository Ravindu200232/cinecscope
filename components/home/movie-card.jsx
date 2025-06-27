"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// MovieCard Component
export default function MovieCard(movie) {
  const [posterUrl, setPosterUrl] = useState(movie.poster || "/placeholder.svg");

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="border-primary/20 hover:border-primary/50 overflow-hidden py-0 transition-colors">
        <div className="aspect-2/3 w-full overflow-hidden">
          <Image
            width={300}
            height={450}
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            priority
            onError={() => setPosterUrl("/images/movie-placeholder.png")}
          />
        </div>

        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-semibold text-xl">{movie.title}</h3>
          <p className="text-muted-foreground text-sm">
            {movie.year} • {movie.runtime} min
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genre?.slice(0, 2).map((genre, index) => (
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
            <span className="text-primary text-sm font-medium">
              {movie?.rating}/10
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary absolute right-0 bottom-0 m-1"
          >
            Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

// Skeleton Component
export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg">
      <Skeleton className="aspect-2/3 w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between gap-2 pt-2 px-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
