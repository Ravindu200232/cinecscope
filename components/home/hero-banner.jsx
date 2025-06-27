import { Button } from "../ui/button";
import { Play } from "lucide-react";

// Hero Banner Section
export default function HeroBanner() {
  return (
    <section id="overview" className="relative overflow-hidden min-h-[70vh]">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="bg-gradient-to-r from-black/70 via-black/50 to-black/70 absolute inset-0 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-60 dark:opacity-40"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 py-32 md:py-40 lg:py-52">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
              Discover Amazing Movies
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-white/80 drop-shadow-sm md:text-xl">
              Explore our collection of the best movies from around the world.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Play className="h-4 w-4" />
              Browse Movies
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary/10 backdrop-blur-xs border-primary/30 hover:bg-primary/20 text-white hover:text-white"
            >
              Latest Releases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
