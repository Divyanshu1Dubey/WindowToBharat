import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/#programs" },
  { label: "Blog", href: "/#blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pathname = location.pathname.toLowerCase();
  const isTransparentPage =
    pathname === "/" ||
    pathname === "/explore" ||
    pathname === "/heal" ||
    pathname === "/spiritual" ||
    pathname === "/mindfulness";

  const isSolid = scrolled || !isTransparentPage || open;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-white/95 backdrop-blur shadow-sm text-black border-b border-orange-500/10"
          : "bg-transparent text-white",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <div className="bg-white/95 backdrop-blur rounded-xl px-3 py-1 flex items-center justify-center border border-orange-500/10 shadow-sm">
            <img 
              src="/Window_To_Bharat - Copy.png" 
              alt="Window to Bharat" 
              className="h-9 w-auto object-contain" 
            />
          </div>
        </Link>

        {/* Desktop */}

        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.label}>
              {l.href.startsWith("#") ? (
                <a href={l.href} className="hover:text-orange-500">
                  {l.label}
                </a>
              ) : (
                <Link to={l.href} className="hover:text-orange-500">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile */}

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white">
          <ul className="p-6 space-y-4">
            {links.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("#") ? (
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
