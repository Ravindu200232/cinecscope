import HeroBanner from "@/components/home/hero-banner";
import HeaderNav from "../components/header-nav";
import FeaturedMovies from "@/components/home/featured-movies";
import { Footer2 } from "@/components/footer2";

//SSR-Server Side REndered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeaderNav />
      <main className="h-full">
        <HeroBanner/>
        <FeaturedMovies/>
      </main>
      <Footer2/>
    </div>
  );
}
