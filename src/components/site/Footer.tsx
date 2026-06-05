import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const cols = [
  {
    title: "Explore",
    links: ["Programs", "Destinations", "Blog", "About"],
  },
  {
    title: "Support",
    links: ["Contact", "FAQ", "Booking Terms", "Privacy"],
  },
];

export const Footer = () => (
  <footer id="contact" className="bg-foreground text-background">
    <div className="container mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="inline-block bg-white rounded-xl px-4 py-1.5 border border-orange-500/10 mb-4">
          <img 
            src="/Window_To_Bharat - Copy.png" 
            alt="Window to Bharat Logo" 
            className="h-10 w-auto object-contain" 
          />
        </div>
        <p className="mt-4 text-background/70 max-w-sm leading-relaxed text-sm">
          Cultural travel programs designed with care, walked with locals,
          remembered for a lifetime.
        </p>
        <div className="mt-6 flex gap-4">
          {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="w-9 h-9 grid place-items-center border border-background/30 hover:border-gold hover:text-gold transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {cols.map((c) => (
        <div key={c.title}>
          <h4 className="font-serif text-lg mb-4">{c.title}</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {c.links.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-background/10">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 justify-between text-xs text-background/50">
        <p>© 2026 Window to Bharat. All rights reserved.</p>
        <p>Crafted with warmth in India.</p>
      </div>
    </div>
  </footer>
);
