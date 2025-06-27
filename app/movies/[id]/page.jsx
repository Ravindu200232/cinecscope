// app/movie/[id]/page.jsx

import { getMovieById } from "@/actions/movies";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = params;
  const movie = await getMovieById(id);

  return {
    title: movie?.data?.title
      ? `CineScope | ${movie.data.title}`
      : "CineScope | Movie Details",
    description:
      movie?.data?.overview ??
      "Find your favorite movie ratings and recommendations",
  };
}

export default async function MovieDetailsPage({ params }) {
  const { id } = params;
  const movie = await getMovieById(id);

  if (!movie || !movie.data) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-2xl text-red-600 font-semibold">🚫 Movie Not Found</h1>
      </main>
    );
  }

  const {
    title,
    director,
    genre,
    overview,
    releaseDate,
    rating,
    runtime,
    imdb,
    poster,
    backdrop,
    year,
    status,
    createdAt,
    updatedAt,
  } = movie.data;

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* Backdrop */}
      <div
        className="w-full h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backdrop || "/placeholder.svg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            {title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={poster}
              alt={`${title} Poster`}
              className="rounded-lg shadow-lg w-full max-w-sm object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4 text-gray-800">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p><strong>🎬 Director:</strong> {director}</p>
            <p><strong>📅 Release Date:</strong> {releaseDate}</p>
            <p><strong>🎞️ Runtime:</strong> {runtime} minutes</p>
            <p><strong>🌟 IMDB:</strong> {imdb}</p>
            <p><strong>⭐ Rating:</strong> {rating}/10</p>
            <p><strong>📆 Year:</strong> {year}</p>
            <p><strong>📚 Genre:</strong> {genre?.join(", ")}</p>
            <p><strong>📌 Status:</strong> {status}</p>
            <p><strong>🕒 Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
            <p><strong>🔄 Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p>

            <div>
              <h3 className="text-xl font-semibold mt-6">📝 Overview</h3>
              <p className="text-justify mt-2 text-gray-600">{overview}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
