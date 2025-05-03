import Image from "next/image";

//SSR-Server Side REndered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      
      <header className="  bg-gray-400 flex-1">
        Header section
      </header>
      <main className="flex-1  bg-green-900">
        Main Section
      </main>
      <footer className="flex-1 bg-amber-400 ">
        Footer Section
      </footer>
    </div>
  );
}
