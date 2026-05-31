import React from "react";

const Contact = () => {
  return (
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
                <h3 className="text-orange-500 text-xl mb-3">Organization</h3>

                <p className="text-gray-600">
                  An initiative of Noble Citizen Foundation
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

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
            />

            <textarea
              rows={6}
              placeholder="Message"
              className="w-full p-4 border rounded-xl bg-[#fafafa]"
            />

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
