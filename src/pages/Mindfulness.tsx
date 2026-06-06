import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const hero = "https://images.unsplash.com/photo-1506126613408-eca07ce68773";

const about = "https://images.unsplash.com/photo-1518611012118-696072aa579a";

const village = "https://images.unsplash.com/photo-1528127269322-539801943592";

const gallery1 = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

const gallery2 = "https://images.unsplash.com/photo-1490730141103-6cac27aaab94";

const gallery3 = "https://images.unsplash.com/photo-1519834785169-98be25ec3f84";

const gallery4 = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e";

const curator = "/WhatsApp Image 2026-06-04 at 2.33.02 PM.jpeg";

const days = [
  {
    day: "Day 01",
    title: "Welcome & Introduction",
    text: "Begin your mindfulness journey with grounding yoga, guided meditation, emotional intelligence sessions, and mindful nourishment in a peaceful Himalayan atmosphere.",
  },

  {
    day: "Day 02",
    title: "Awareness & Reflection",
    text: "Deepen self-awareness through sunrise meditation, mindfulness workshops, journaling, gratitude practice, and emotional understanding.",
  },

  {
    day: "Day 03",
    title: "Village Immersion",
    text: "Experience rural Himalayan life through village walks, local traditions, organic meals, community interaction, and meditation in nature.",
  },

  {
    day: "Day 04",
    title: "Emotional Healing",
    text: "Reconnect emotionally through empathy workshops, healing meditation, heartfulness practices, mindful conversations, and inner reflection.",
  },

  {
    day: "Day 05",
    title: "Integration & Closure",
    text: "Conclude your retreat with intention-setting meditation, group reflection, emotional integration, gratitude practice, and farewell ceremony.",
  },
];

const Mindfulness = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.country.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbwEuXD1MiMx_bruXd98V8nMkFEWlSluWXt7CchGooMCXhePEjo57KdOAq03TwN6x7TKUA/exec";
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "registration",
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          message: form.message
        })
      });
      toast.success("Registration request sent! We will contact you soon.");
      setForm({ name: "", email: "", phone: "", country: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f8efe4, #f5e6d3, #f8efe4)",
        fontFamily: "'Poppins', sans-serif",
      }}
      className="text-[#2d2d2d]"
    >
      <Navbar />
      {/* HERO SECTION */}

      <section className="relative h-screen overflow-hidden">
        <img
          src={hero}
          alt="Mindfulness Retreat"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-5">
            <p className="tracking-[6px] uppercase text-sm mb-5 text-gray-200">
              Dharamshala • Himachal Pradesh • India
            </p>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Mindfulness
              <br />
              Retreat
            </h1>

            <p className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-gray-200 leading-8">
              A transformative 5-day Zen wellness experience blending yoga,
              meditation, emotional healing, mindfulness, and Himalayan
              serenity.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-10">
              <a
                href="#program"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 duration-300"
              >
                Explore Program
              </a>

              <a
                href="#booking"
                className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black duration-300"
              >
                Reserve Your Spot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              About Retreat
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8 text-[#204e4a]">
              Reconnect with
              <br />
              Your Inner Self
            </h2>

            <p className="text-lg leading-9 text-gray-700 mb-6">
              Our 5-Day Zen Wellness Program combines yoga, meditation,
              emotional intelligence, and mindful living practices to create a
              transformative healing experience.
            </p>

            <p className="text-lg leading-9 text-gray-700">
              Surrounded by the beauty of Dharamshala, participants experience
              deep emotional healing, self-awareness, village immersion,
              nutritious meals, and peaceful mindfulness practices.
            </p>
          </div>

          <div>
            <img
              src={about}
              alt="About"
              className="rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Experience
            </p>

            <h2 className="text-5xl font-bold text-[#204e4a]">
              Retreat Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Holistic Wellness",
              "Emotional Healing",
              "Village Immersion",
              "Mindfulness Practices",
              "Balanced Lifestyle",
              "Peaceful Himalayan Setting",
            ].map((item, index) => (
              <div key={index}>
                <div className="h-[1px] bg-[#d5b89c] mb-6" />

                <h3 className="text-2xl font-semibold mb-4 text-[#204e4a]">
                  {item}
                </h3>

                <p className="text-gray-700 leading-8">
                  Experience transformative mindfulness practices, emotional
                  growth, wellness activities, and peaceful self-discovery.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM TIMELINE */}

      <section id="program" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Journey
            </p>

            <h2 className="text-5xl font-bold text-[#204e4a]">
              5-Day Retreat Program
            </h2>
          </div>

          <div className="border-l border-[#c8a98d] pl-10 space-y-24">
            {days.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[46px] top-2 w-5 h-5 rounded-full bg-[#204e4a]" />

                <p className="uppercase tracking-[4px] text-sm text-[#b77950] mb-4">
                  {item.day}
                </p>

                <h3 className="text-4xl font-bold mb-6 text-[#204e4a]">
                  {item.title}
                </h3>

                <p className="text-lg leading-9 text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLAGE EXPERIENCE */}

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <img
            src={village}
            alt="Village"
            className="rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          />

          <div>
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Rural Experience
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8 text-[#204e4a]">
              Mindfulness
              <br />
              Through Simplicity
            </h2>

            <p className="text-lg leading-9 text-gray-700">
              Spend time in a peaceful Himalayan village, connect with local
              traditions, experience organic living, and discover mindfulness
              through simplicity, community, and nature.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Moments
            </p>

            <h2 className="text-5xl font-bold text-[#204e4a]">
              Retreat Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[gallery1, gallery2, gallery3, gallery4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="gallery"
                className={`w-full object-cover rounded-[30px]
                  ${index % 2 === 0 ? "h-[500px]" : "h-[350px] mt-20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CURATOR */}

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-14 items-center">
          <img
            src={curator}
            alt="Curator"
            className="w-[280px] h-[360px] object-cover rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] mx-auto"
          />

          <div>
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Curator
            </p>

            <h2 className="text-5xl font-bold mb-6 text-[#204e4a]">
              Mr. Jestin Anthony
            </h2>

            <h4 className="text-2xl text-[#b77950] mb-8">
              Emotional Intelligence Practitioner
            </h4>

            <p className="text-lg leading-9 text-gray-700">
              With over 20 years of meditation and emotional intelligence
              experience, Jestin Anthony has guided countless individuals toward
              emotional healing, inner peace, mindfulness, and holistic
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING */}

      <section id="booking" className="py-28 px-6">
        <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-md rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[5px] text-sm text-[#b77950] mb-4">
              Registration
            </p>

            <h2 className="text-5xl font-bold text-[#204e4a]">
              Reserve Your Experience
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white p-5 rounded-2xl outline-none"
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white p-5 rounded-2xl outline-none"
              disabled={loading}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-white p-5 rounded-2xl outline-none"
              disabled={loading}
            />

            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="bg-white p-5 rounded-2xl outline-none"
              disabled={loading}
            />

            <textarea
              placeholder="Your Message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white p-5 rounded-2xl outline-none md:col-span-2"
              disabled={loading}
            />

            <button 
              type="submit"
              disabled={loading}
              className="bg-[#204e4a] text-white py-5 rounded-full text-lg font-semibold hover:scale-[1.02] duration-300 md:col-span-2 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Mindfulness;
