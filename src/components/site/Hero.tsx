import heroImg from "@/assets/hero-india.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Taj Mahal silhouette at golden sunset"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 container mx-auto px-6 text-center text-background fade-up">
        <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-gold mb-6">
          Cultural Journeys · Est. 2024
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] max-w-4xl mx-auto">
          Unlock India's <em className="text-gold not-italic font-normal">Diversity</em>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-background/85 leading-relaxed">
          Immersive programs across the subcontinent — from Himalayan peaks
          to Keralan backwaters. Travel slow, travel deep.
        </p>
        <div className="mt-10">
          <a
            href="#programs"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 shadow-warm transition-all hover:-translate-y-0.5"
          >
            Explore Programs
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-background/70 text-xs tracking-widest uppercase">
        Scroll
      </div>
    </section>
  );
};
