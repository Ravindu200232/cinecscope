import React from 'react'
import AddMovieDialog from './add-movie-dialog'
import MovieData from './movie-data'

export default function MoviePage() {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-3xl font-bold tracking-tighter'>Movies</h2>
                <p className='text-muted-foreground tracking-wider'>Manage your movie catalog</p>
            </div>


            <AddMovieDialog/>
        </div>

        <MovieData/>
    </div>
  )
}
