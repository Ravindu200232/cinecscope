import HeroBanner from "@/components/home/hero-banner";
import HeaderNav from "../components/header-nav";
import FeaturedMovies from "@/components/home/featured-movies";

//SSR-Server Side REndered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeaderNav />
      <main className="h-full">
        <HeroBanner/>
        <FeaturedMovies/>
      </main>
      <footer className=" bg-amber-400 h-72 ">Footer Section</footer>
    </div>
  );
}
