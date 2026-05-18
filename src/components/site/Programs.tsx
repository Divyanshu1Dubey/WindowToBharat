import kerala from "@/assets/program-kerala.jpg";
import rajasthan from "@/assets/program-rajasthan.jpg";
import himalayas from "@/assets/program-himalayas.jpg";
import { SectionHeading } from "./SectionHeading";

const programs = [
  {
    img: kerala,
    title: "Kerala Backwaters",
    duration: "7 Days",
    desc: "Glide through palm-lined waterways aboard a traditional houseboat.",
  },
  {
    img: rajasthan,
    title: "Rajasthan Sands",
    duration: "10 Days",
    desc: "Forts, palaces and a camel trek across the Thar desert at sunset.",
  },
  {
    img: himalayas,
    title: "Himalayan Retreat",
    duration: "12 Days",
    desc: "Quiet monasteries and snow-touched peaks in Himachal Pradesh.",
  },
];

export const Programs = () => (
  <section id="programs" className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Our Programs"
        title="Curated Journeys"
        subtitle="Three signature itineraries, each crafted with local hosts and storytellers."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {programs.map((p) => (
          <article
            key={p.title}
            className="group bg-card shadow-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 flex flex-col gap-3 flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                {p.duration}
              </p>
              <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {p.desc}
              </p>
              <a
                href="#contact"
                className="mt-2 inline-block text-sm font-medium text-primary nav-link self-start"
              >
                Discover →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
