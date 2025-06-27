import React, { Suspense } from 'react'
import { Button } from '../ui/button'
import MoviesList, { MovieListSkeleton } from './movies-list'
import MovieSelectors from '@/app/admin/movies/movie-selectors'


export default function FeaturedMovies() {
  return (
   <section id="featured" className="container px-4 py-12 md:px-6">
    <div className='mb-8 flex items-center justify-between'>
        <div>
            <h2 className='text-3xl font-bold tracking-tight '>Featured Movies</h2>
           <p className='text-muted-foreground'>Explore the latest and greatest movies that are making waves in the cinema world</p>
        </div>

        <Button variant="outline">View All</Button>
    </div>

    <div className='py-4'><MovieSelectors /></div>

    {/*Movies list*/}
    <Suspense fallback={<MovieListSkeleton/>}>
    <MoviesList/>
    </Suspense>
    

   </section>
  )
}
