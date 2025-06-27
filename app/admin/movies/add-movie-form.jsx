"use client";
import { createMovie } from "@/actions/movies";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function AddMovieForm() {

  const router = useRouter();

    const [isSubmitting,setIsSubmitting] =  useState(false);

    const handleSubmit = async (event)=>{

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title");
        const year = formData.get("year");
        const director = formData.get("director");
        const genre = formData.get("genre");
        const rating = formData.get("rating");
        const runtime = formData.get("runtime");
        const overview = formData.get("overview");
        const poster = formData.get("poster");
        const backdrop = formData.get("backdrop");
        const movieStatus = formData.get("status");

       setIsSubmitting(true);

    const response = await createMovie({
     title,
     year: Number(year),
     director,
     genre: Array.isArray(genre) ? genre : [genre],
     rating: Number(rating),
     runtime: Number(runtime),
     overview,
     poster,
     backdrop,
     status: movieStatus,
     releaseDate: year ? `${year}-01-01` : undefined,
     createdAt: new Date().toISOString(),
     updatedAt: new Date().toISOString(),
     imdb: rating ? String(rating) : undefined,
     id: Math.random().toString(36).substr(2, 9), // Example id generation
      })

       setIsSubmitting(false);

      if(response?.success){
        console.log("Movie added successfully",response)
        router.refresh();
      
        
      }
    };

    

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <Input id="title" name="title" placeholder="Movie title" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="year">Year</label>
          <Select id="year" name="year" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="director">Director</label>
          <Input id="director" name="director" placeholder="Director name" />
        </div>

        <div className="space-y-2">
          <label htmlFor="genre">Genre</label>
          <Select id="genre" name="genre" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Action">Action</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
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
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Movie rating ( 0.0 - 10.0 )"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="runtime">Runtime (minutes)</label>
          <Input
            id="runtime"
            name="runtime"
            type="number"
            min="1"
            step="1"
            placeholder="Runtime in minutes"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="overview">Overview</label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie description"
          className="max-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="poster">Poster URL</label>
          <Input id="poster" name="poster" placeholder="URL to poster image" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="backdrop">Backdrop URL</label>
          <Input id="backdrop" name="backdrop" placeholder="URL to backdrop image"  />
        </div>


        <div className="space-y-2">
          <label htmlFor="status">Status</label>
          <Select id="status" name="status" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select status" />
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
        <Button type="button" variant="outline" className="min-w-[102px]">Cancel</Button>
         <Button type="submit"  className="min-w-[102px]" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Movie"}
            </Button>
      </DialogFooter>
    </form>
  );
}
