import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { About } from "@/components/site/About";
import { Blog } from "@/components/site/Blog";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
      <About />
      <Blog />
      <Footer />
    </main>
  );
};

export default Index;



