import HeaderNav from "../components/header-nav";

//SSR-Server Side REndered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeaderNav />
      <main className="flex-1  bg-primary min-h-screen">Main Section</main>
      <footer className=" bg-amber-400 h-72 ">Footer Section</footer>
    </div>
  );
}
