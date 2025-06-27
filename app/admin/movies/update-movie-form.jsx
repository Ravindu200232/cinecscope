"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateMovie } from "@/actions/movies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function UpdateMovieForm({ onClose, movie }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // controlled form states initialized from movie data
  const [title, setTitle] = useState(movie?.title || "");
  const [director, setDirector] = useState(movie?.director || "");
  const [selectedYear, setSelectedYear] = useState(
    movie?.year?.toString() || ""
  );
  const [selectedGenre, setSelectedGenre] = useState(movie?.genre?.[0] || ""); // only handle first genre for now
  const [rating, setRating] = useState(movie?.rating?.toString() || "");
  const [runtime, setRuntime] = useState(movie?.runtime?.toString() || "");
  const [overview, setOverview] = useState(movie?.overview || "");
  const [poster, setPoster] = useState(movie?.poster || "");
  const [backdrop, setBackdrop] = useState(movie?.backdrop || "");
  const [status, setStatus] = useState(movie?.status || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await updateMovie(movie.id, {
      id: movie.id,
      title,
      year: Number(selectedYear),
      director,
      genre: [selectedGenre], // handle single genre for now
      rating: parseFloat(rating),
      runtime: parseInt(runtime),
      overview,
      poster,
      backdrop,
      status,
      imdb: movie.imdb, // keep existing imdb value
    });

    console.log("Updated data", {
      title,
      year: selectedYear,
      director,
      genre: selectedGenre,
      rating,
      runtime,
      overview,
      poster,
      backdrop,
      status,
    });

    console.log("Submitting update:", response);

    // Call your update API here
    // await updateMovie(updatedMovie);

    setIsSubmitting(false);
    onClose();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="year">Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2014">2014</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="director">Director</label>
          <Input
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="genre">Genre</label>
          <Select
            value={selectedGenre}
            onValueChange={setSelectedGenre}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Action">Action</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Drama">Drama</SelectItem>
              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="rating">Rating</label>
          <Input
            id="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="runtime">Runtime (minutes)</label>
          <Input
            id="runtime"
            type="number"
            min="1"
            step="1"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="overview">Overview</label>
        <Textarea
          id="overview"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="poster">Poster URL</label>
          <Input
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="backdrop">Backdrop URL</label>
          <Input
            id="backdrop"
            value={backdrop}
            onChange={(e) => setBackdrop(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status">Status</label>
          <Select value={status} onValueChange={setStatus} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
