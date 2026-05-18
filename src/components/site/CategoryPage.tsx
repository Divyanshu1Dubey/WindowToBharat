import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export const CategoryPage = ({ eyebrow, title, description, image, highlights }: Props) => (
  <main className="min-h-screen bg-background">
    <Navbar />

    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container mx-auto h-full px-6 flex flex-col justify-end pb-16 text-background fade-up">
        <p className="uppercase tracking-[0.4em] text-xs text-gold mb-4">{eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-7xl font-medium max-w-3xl">{title}</h1>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed text-lg">
          <p className="text-foreground font-serif text-2xl">{description}</p>
          <p>
            Every Window to Bharat program is built in partnership with locals —
            from third-generation artisans to scholars and surgeons. We focus on
            depth over distance, curiosity over checklist.
          </p>
          <p>
            Reach out to design a custom itinerary, or join one of our small
            group departures throughout the year.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary nav-link text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>

        <aside className="bg-secondary p-8">
          <h3 className="font-serif text-2xl mb-5">Highlights</h3>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-foreground">
                <span className="text-gold">◆</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            className="mt-8 inline-block w-full text-center px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Enquire Now
          </a>
        </aside>
      </div>
    </section>

    <Footer />
  </main>
);
