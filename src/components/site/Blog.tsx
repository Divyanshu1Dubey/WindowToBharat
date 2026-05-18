import festivals from "@/assets/blog-festivals.jpg";
import cuisine from "@/assets/blog-cuisine.jpg";
import varanasi from "@/assets/blog-varanasi.jpg";
import { SectionHeading } from "./SectionHeading";

const posts = [
  {
    img: festivals,
    category: "Culture",
    date: "Apr 12, 2026",
    title: "The Festival of Lights: Inside Diwali",
  },
  {
    img: cuisine,
    category: "Food",
    date: "Mar 28, 2026",
    title: "A Thali Tour Across Five Regions",
  },
  {
    img: varanasi,
    category: "Spirituality",
    date: "Mar 04, 2026",
    title: "Sunrise on the Ganges in Varanasi",
  },
];

export const Blog = () => (
  <section id="blog" className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Journal"
        title="Stories from the Road"
        subtitle="Field notes, recipes, and reflections from our recent travels."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden mb-5">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{p.category}</span>
              <span>·</span>
              <span>{p.date}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
              {p.title}
            </h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);
