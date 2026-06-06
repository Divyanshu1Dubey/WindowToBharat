import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const mission = [
  {
    title: "Explore",
    desc: "India is a land of incredible diversity—from the Himalayas to Kerala backwaters. Discover landscapes, traditions, and unforgettable experiences.",
  },
  {
    title: "Spiritual Wellness",
    desc: "Discover mindfulness, meditation, emotional healing, and spiritual growth through our curated retreat experiences.",
  },
  {
    title: "Heal",
    desc: "Experience Ayurveda, Yoga, and holistic traditions that rejuvenate mind, body, and spirit.",
  },
  {
    title: "Serve",
    desc: "Join impactful volunteer initiatives and contribute positively to communities across India.",
  },
];

const whyJoin = [
  {
    no: "01",
    title: "Expert Guidance",
    desc: "Our team understands India’s cultural, educational, healthcare, and social landscape.",
  },
  {
    no: "02",
    title: "Tailored Experiences",
    desc: "Every journey is customized for travelers, students, wellness seekers, and volunteers.",
  },
  {
    no: "03",
    title: "Cultural Immersion",
    desc: "Connect deeply with India through authentic local experiences and partnerships.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar />
      <div className="bg-white text-[#222]">
        {/* HERO */}
        <section className="bg-[#faf7f3] py-28 px-6 text-center">
          <p className="tracking-[4px] text-orange-500 mb-5 uppercase font-medium">
            Your Gateway to Explore, Heal, and Mindfulness
          </p>

          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            About Window to Bharat
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">
            Welcome to Window to Bharat, your gateway to a rich tapestry of
            experiences in India.
          </p>
        </section>

        {/* INTRO */}

        <section className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-serif mb-8">Our Journey</h2>

          <p className="text-gray-600 leading-9 text-lg">
            At Window to Bharat, we create bridges connecting the world to the
            diverse opportunities India offers. Whether you wish to explore,
            study, heal, or serve, we guide your transformational journey through
            India.
          </p>
        </section>

        {/* MISSION */}

        <section className="max-w-6xl mx-auto px-6 pb-28">
          <h2 className="text-center text-5xl font-serif mb-14">Our Mission</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {mission.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-orange-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-3xl text-orange-500 mb-5">{item.title}</h3>

                <p className="text-gray-600 leading-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY JOIN */}

        <section className="bg-[#faf7f3] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-center text-5xl font-serif mb-16">Why Join Us</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {whyJoin.map((item) => (
                <div
                  key={item.no}
                  className="bg-white rounded-2xl p-10 border shadow-sm"
                >
                  <span className="text-5xl text-orange-400">{item.no}</span>

                  <h3 className="text-2xl mt-6 mb-4">{item.title}</h3>

                  <p className="text-gray-600 leading-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default About;
