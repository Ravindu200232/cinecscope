"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { UpdateMovieForm } from './update-movie-form';

export default function UpdateMovieDialog({open,onOpenChange,movie}) {

    console.log("Movie update",movie)
  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
  
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Update Movie</DialogTitle>
      <DialogDescription>
        Fill in the details to update the movie
      </DialogDescription>
    </DialogHeader>
    {/* Add Movie Form*/}
   <UpdateMovieForm onClose={onOpenChange} movie={movie} />

  </DialogContent>
</Dialog>
  )
}
