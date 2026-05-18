import { Link } from "react-router-dom";
import explore from "@/assets/cat-explore.jpg";
import study from "@/assets/mind.webp";
import heal from "@/assets/cat-heal.jpg";

const cats = [
  { label: "Explore", img: explore, to: "/explore" },

  { label: "Spiritual Wellness", img: study, to: "/Spiritual" },

  {
    label: "Heal",
    img: heal,
    to: "https://window-to-bharat.vercel.app",
    external: true,
  },
];
export const Categories = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="font-serif text-4xl md:text-6xl font-medium text-foreground max-w-3xl mx-auto leading-tight">
        Your extraordinary escape just a click away
      </h2>

      <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        A new journey begins here within. Find a path that suits you and start
        travelling. We offer the very best of Bharat.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) =>
          c.external ? (
            <a
              key={c.label}
              href={c.to}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background"
            >
              <CardContent c={c} />
            </a>
          ) : (
            <Link
              key={c.label}
              to={c.to}
              className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background"
            >
              <CardContent c={c} />
            </Link>
          ),
        )}
      </div>
    </div>
  </section>
);

const CardContent = ({ c }) => (
  <>
    <div className="relative aspect-[3/4] overflow-hidden shadow-card">
      <img
        src={c.img}
        alt={c.label}
        loading="lazy"
        width={768}
        height={1024}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/30 transition-colors" />
    </div>

    <p className="mt-5 font-serif text-xl tracking-[0.3em] uppercase text-foreground group-hover:text-primary transition-colors">
      {c.label}
    </p>
  </>
);
