import aboutImg from "@/assets/about-india.jpg";

export const About = () => (
  <section id="about" className="py-24 md:py-32 bg-secondary">
    <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
      <div className="relative">
        <img
          src={aboutImg}
          alt="Vibrant Indian street market in golden light"
          loading="lazy"
          width={1280}
          height={1024}
          className="w-full aspect-[5/4] object-cover shadow-card"
        />
        <div className="hidden md:block absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary -z-0" />
      </div>

      <div>
        <p className="uppercase tracking-[0.35em] text-xs text-primary mb-4">
          About Us
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-foreground">
          A window into the soul of Bharat.
        </h2>
        <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We design slow, intentional journeys for travellers who want more
            than postcards. Every program is built with local communities —
            artisans, cooks, farmers, and storytellers.
          </p>
          <p>
            From the ghats of Varanasi to the spice gardens of Kerala, we open
            doors that ordinary itineraries leave closed.
          </p>
        </div>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center px-7 py-3 border border-foreground text-foreground text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
        >
          Our Story
        </a>
      </div>
    </div>
  </section>
);
