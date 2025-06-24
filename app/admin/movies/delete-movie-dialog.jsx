"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

export default function DeleteMovieDialog({ open, onOpenChange, movie,onConfirm,isLoading = false,}) {
  console.log("Movie update", movie);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogDescription className="sm text-gray-500 my-5">
            Are you sure you want to delete the movie .
            <strong className="text-md"> 
              { movie?.title}-{movie?.year}
            </strong>
            ? <br />
            <span className="text-xs text-red-300">
              This action cannot be undone
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={()=> onOpenChange(false)} disabled={isLoading}>Cancel</Button>
          <Button variant="destructive" onClick={()=>onConfirm(movie?.id)} disabled={isLoading} >{isLoading && (<Loader2 className="animate-spin"/>)}Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
