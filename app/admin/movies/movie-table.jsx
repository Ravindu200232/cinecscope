"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UpdateMovieDialog from "./update-movie-dialog";
import DeleteMovieDialog from "./delete-movie-dialog";
import { deleteMovie } from "@/actions/movies";
import { useRouter } from "next/navigation";

export default function MovieTable({ movies }) {
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleUpdateDialog = (open) => {
    requestAnimationFrame(() => setShowUpdateDialog(open || !showUpdateDialog));
  };

  const toggleDeleteDialog = (open) => {
    requestAnimationFrame(() => setShowDeleteDialog(open || !showDeleteDialog));
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      setIsDeleting(true);
      const resp = await deleteMovie(movieId);
      if (resp?.success) {
        setSelectedMovie(null);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption className="sr-only">Admin Movies Table</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>Poster</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {movies.map((movie, key) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{key + 1}</TableCell>

              <TableCell>
                <Image
                  src={movie.poster || "/images/movie-placeholder.png"}
                  alt={movie.title}
                  height={40}
                  width={28}
                  className="h-10 w-7 rounded object-cover"
                />
              </TableCell>

              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.year}</TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell className="text-red-500">
                {Number(movie.rating).toFixed(1)}
              </TableCell>

              <TableCell className="capitalize">
                <Badge className={getStatusClass(movie.status)}>
                  {movie.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open Menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Movie Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert("View details clicked")}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedMovie(movie);
                        toggleUpdateDialog(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedMovie(movie);
                        toggleDeleteDialog(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateMovieDialog
        open={showUpdateDialog}
        onOpenChange={toggleUpdateDialog}
        movie={selectedMovie}
      />

      <DeleteMovieDialog
        open={showDeleteDialog}
        onOpenChange={toggleDeleteDialog}
        onConfirm={(id) => handleDeleteMovie(id)}
        movie={selectedMovie}
        isLoading={isDeleting}
      />
    </div>
  );
}
