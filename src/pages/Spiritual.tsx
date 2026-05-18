const programs = [
  {
    title: "Mindfulness Retreat",
    description:
      "5-Day Zen retreat in Dharamshala focused on mindfulness, emotional balance, and inner peace.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop",
    link: "/mindfulness",
    active: true,
  },
  {
    title: "Meditation Retreat",
    description:
      "Deep meditation retreat for clarity, emotional healing, and spiritual growth.",
    image:
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=2070&auto=format&fit=crop",
    active: false,
  },
  {
    title: "Emotional Healing Retreat",
    description:
      "Experience emotional balance, healing, and personal transformation.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2070&auto=format&fit=crop",
    active: false,
  },
];

const Spiritual = () => {
  return (
    <div className="bg-[#f3e3cf] text-[#333]">
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center px-5 py-24 md:py-36 text-white text-center"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
          url('https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=2070&auto=format&fit=crop')
          `,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 tracking-wide">
            Spiritual Wellness Programs
          </h1>

          <p className="text-sm md:text-lg text-gray-200 leading-relaxed">
            Discover mindfulness, meditation, emotional healing, and spiritual
            growth through our curated retreat experiences.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="px-5 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-[#2f6f66] font-semibold mb-3">
            Our Programs
          </h2>

          <div className="w-16 h-[3px] bg-[#c0572d] mx-auto rounded mb-12"></div>

          <div className="flex flex-wrap justify-center gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-[320px] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className={`w-full h-[220px] object-cover ${
                      !program.active ? "grayscale-[20%] brightness-90" : ""
                    }`}
                  />

                  {!program.active && (
                    <div className="absolute top-3 right-3 bg-[#c0572d] text-white text-xs px-3 py-1 rounded-full shadow-md">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="p-6 text-center">
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      program.active ? "text-[#2f6f66]" : "text-gray-500"
                    }`}
                  >
                    {program.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {program.description}
                  </p>

                  {program.active ? (
                    <a
                      href={program.link}
                      className="inline-block bg-[#c0572d] hover:bg-[#a34722] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                    >
                      View Program
                    </a>
                  ) : (
                    <span className="inline-block text-sm text-gray-400 font-medium">
                      Available Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Spiritual;
