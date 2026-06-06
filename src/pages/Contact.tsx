import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycby_E3Ee_3QPA8x7_83Fay5TA3FJQVDuqe40kcUtSeqm6K_co2ISmif7Yb-8hL_S2Y3iUw/exec";
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar />
      <div className="bg-white min-h-screen">
      {/* HERO */}

      <section className="bg-[#faf7f3] py-28 text-center">
        <p className="tracking-[6px] text-orange-500">
          CONTACT WINDOW TO BHARAT
        </p>

        <h1 className="text-5xl md:text-7xl font-serif mt-6">Contact Us</h1>
      </section>

      {/* CONTACT SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14">
          {/* LEFT */}

          <div>
            <h2 className="text-4xl font-serif mb-10">Contact Information</h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-orange-500 text-xl mb-3">Address</h3>

                <p className="text-gray-600 leading-8">
                  216 Sant Nagar
                  <br />
                  East of Kailash
                  <br />
                  New Delhi, India
                </p>
              </div>

              <div>
                <h3 className="text-orange-500 text-xl mb-3">Phone</h3>

                <a href="tel:+919990821680" className="text-gray-600">
                  +91 9990821680
                </a>
              </div>

              <div>
                <h3 className="text-orange-500 text-xl mb-3">Email</h3>

                <a href="mailto:web.windowtobharat@gmail.com" className="text-gray-600 hover:text-orange-500 transition-colors">
                  web.windowtobharat@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-orange-500 text-xl mb-3">Organization</h3>

                <p className="text-gray-600">
                  An initiative of Soulful
                </p>
              </div>
            </div>
          </div>

          {/* MAP */}

          <div className="rounded-2xl overflow-hidden border shadow">
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=East%20of%20Kailash%20New%20Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FORM */}

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="border rounded-2xl p-10 shadow-sm">
          <h2 className="text-4xl font-serif mb-10">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
              disabled={loading}
            />

            <textarea
              rows={6}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
