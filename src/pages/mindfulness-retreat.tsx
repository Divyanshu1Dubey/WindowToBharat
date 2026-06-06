import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import hero from "@/assets/images/hero.jpg";
import about from "@/assets/images/about.jpg";
import locationImg from "@/assets/images/location.jpg";
import room1 from "@/assets/images/room1.jpg";
import room2 from "@/assets/images/room2.jpg";
import zen from "@/assets/images/zen.jpg";
import curator from "@/assets/images/curator.jpg";
import gallery1 from "@/assets/images/gallery1.jpg";
import gallery2 from "@/assets/images/gallery2.jpg";
import gallery3 from "@/assets/images/gallery3.jpg";
import gallery4 from "@/assets/images/gallery4.jpg";

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
      const scriptUrl = "https://script.google.com/macros/s/AKfycby_E3Ee_3QPA8x7_83Fay5TA3FJQVDuqe40kcUtSeqm6K_co2ISmif7Yb-8hL_S2Y3iUw/exec";
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
    <div className="bg-[#f3e3cf] text-[#333] min-h-screen">
      <div className="max-w-6xl mx-auto p-5">

        {/* HERO SECTION */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <img
            src={hero}
            alt="Mindfulness Retreat"
            className="w-full rounded-2xl"
          />

          <h1 className="text-4xl font-bold text-center text-[#2f6f66] mt-6">
            Mindfulness Retreat
          </h1>

          <h3 className="text-xl text-center text-[#c0572d] mt-2">
            5-Days Zen Wellness Program
          </h3>

          <p className="text-center mt-4">
            📍 Dharamshala, Himachal Pradesh, India
          </p>

          <p className="text-center max-w-2xl mx-auto mt-4">
            Reconnect with your inner self through yoga, meditation,
            and emotional intelligence in the peaceful Himalayas.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="#booking"
              className="bg-[#2f6f66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c0572d] duration-300"
            >
              Register Now
            </a>

            <a
              href="#program"
              className="bg-[#2f6f66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c0572d] duration-300"
            >
              View Program
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6 grid md:grid-cols-2 gap-6 items-center">
          <img
            src={about}
            alt="About Retreat"
            className="w-full rounded-2xl"
          />

          <div>
            <h2 className="text-3xl font-bold text-[#2f6f66] mb-4">
              About the Retreat
            </h2>

            <p className="mb-4">
              Our 5-day Zen Wellness Program combines Yoga,
              Meditation, and Emotional Intelligence to help
              you achieve mental clarity, emotional balance,
              and holistic well-being.
            </p>

            <p>
              Participants experience daily mindfulness
              practices, nutritious meals, emotional intelligence
              workshops, and village immersion.
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-8">
            Why Join This Retreat
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              {
                title: "🧘 Holistic Approach",
                text: "Combines yoga, meditation, and emotional intelligence.",
              },
              {
                title: "❤️ Emotional Healing",
                text: "Build emotional strength and self-awareness.",
              },
              {
                title: "🏡 Village Immersion",
                text: "Experience rural life and nature.",
              },
              {
                title: "🌿 Mindfulness Focus",
                text: "Develop present-moment awareness.",
              },
              {
                title: "⚖ Balanced Routine",
                text: "Yoga, meditation, workshops, and nutrition.",
              },
              {
                title: "🏔 Serene Setting",
                text: "Peaceful Zen center surrounded by nature.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl hover:-translate-y-2 duration-300 shadow-sm hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAM */}
        <section
          id="program"
          className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6"
        >
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-8">
            5-Day Retreat Program
          </h2>

          {[
            {
              day: "Day 1 – Welcome",
              points: [
                "Arrival & introduction",
                "Yoga & meditation",
                "Emotional intelligence session",
                "Reflection & journaling",
              ],
            },
            {
              day: "Day 2 – Awareness",
              points: [
                "Sunrise meditation",
                "Yoga session",
                "Mindfulness workshop",
                "Reflection circle",
              ],
            },
            {
              day: "Day 3 – Village Experience",
              points: [
                "Village visit",
                "Community interaction",
                "Nature meditation",
              ],
            },
            {
              day: "Day 4 – Emotional Healing",
              points: [
                "Healing meditation",
                "Empathy workshop",
                "Group meditation",
              ],
            },
            {
              day: "Day 5 – Closure",
              points: [
                "Final meditation",
                "Integration session",
                "Closing ceremony",
              ],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl mb-4"
            >
              <h3 className="text-xl font-bold mb-3">{item.day}</h3>

              <ul className="list-disc ml-5 space-y-1">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* LOCATION */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6 grid md:grid-cols-2 gap-6 items-center">
          <img
            src={locationImg}
            alt="Location"
            className="w-full rounded-2xl"
          />

          <div>
            <h2 className="text-3xl font-bold text-[#2f6f66] mb-4">
              Retreat Location
            </h2>

            <p className="mb-4">
              Dharamshala is located in the Himalayan foothills,
              known for its peaceful environment and spiritual atmosphere.
            </p>

            <p>Temperature: 10°C to 20°C</p>
          </div>
        </section>

        {/* ACCOMMODATION */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-8">
            Accommodation
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[room1, room2, zen].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Accommodation"
                className="w-full rounded-2xl"
              />
            ))}
          </div>
        </section>

        {/* CURATOR */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6 grid md:grid-cols-2 gap-6 items-center">
          <img
            src={curator}
            alt="Curator"
            className="w-full rounded-2xl"
          />

          <div>
            <h2 className="text-3xl font-bold text-[#2f6f66] mb-4">
              Curator
            </h2>

            <h3 className="text-2xl font-semibold mb-2">
              Mr. Jestin Anthony
            </h3>

            <p className="mb-3">
              Emotional Intelligence Practitioner
            </p>

            <p>
              20+ years of experience helping individuals
              achieve inner peace.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-8">
            Gallery
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[gallery1, gallery2, gallery3, gallery4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full rounded-2xl"
              />
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <div className="bg-[#2f6f66] text-white text-center p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              5-Day Retreat Package
            </h2>

            <p>
              Accommodation, Meals, Workshops,
              Village Experience
            </p>

            <h1 className="text-5xl font-bold mt-5">
              ₹25,000
            </h1>

            <a
              href="#booking"
              className="inline-block mt-6 bg-white text-[#2f6f66] px-6 py-3 rounded-lg font-semibold hover:bg-[#c0572d] hover:text-white duration-300"
            >
              Book Now
            </a>
          </div>
        </section>

        {/* BOOKING */}
        <section
          id="booking"
          className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6"
        >
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-8">
            Register Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg border"
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg border"
              disabled={loading}
            />

            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 rounded-lg border"
              disabled={loading}
            />

            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full p-3 rounded-lg border"
              disabled={loading}
            />

            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-lg border"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2f6f66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c0572d] duration-300 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </section>

        {/* CONTACT */}
        <section className="bg-[#f6e8d5] p-7 rounded-2xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-center text-[#2f6f66] mb-6">
            Contact
          </h2>

          <div className="text-center space-y-3">
            <p>📞 +91 9990821680</p>
            <p>✉ contact@windowtobharat.com</p>
            <p>📍 New Delhi, India</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#2f6f66] text-white text-center p-5 rounded-t-2xl">
          <p>© Window to Bharat | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Mindfulness;