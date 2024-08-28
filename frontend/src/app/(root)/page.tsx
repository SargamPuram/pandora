import Image from "next/image";
import { AppBar } from "../componenets/AppBar";
import Hero from "../componenets/Hero";
import Footer from "../componenets/Footer";

export default function Home() {
  return (
    <main className="flex bg min-h-screen flex-col items-center justify-between p-12">
      <AppBar />
      <Hero />
      <Footer />
      
    </main>
  );
}
