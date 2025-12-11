import React, { useState } from "react";
import { Instagram, ChevronDown, Mail } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Added for routing

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const policyLinks = [
    ["About us", "/about"],
    ["Shipping Payment", "/shipping"],
    ["Payment Policy", "/returns"],
    ["Brand Manifesto", "/privacy"],
    ["Terms & Conditions", "/terms"],
    ["Contact us", "/contact"],
  ];

  return (
    <footer className="bg-[#440504] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Brand Section */}
        <div className="mb-8 lg:mb-10">
          <h2 className="text-[11px] font-light mb-3 tracking-widest uppercase text-white">
            Our Brand
          </h2>
          <p className="text-[11px] text-white/80 leading-relaxed font-light">
            Vinsaraa is India's first kurti-brand — celebrating traditional prints from every state in effortless everyday wear.
            We blend heritage with breathable linen comfort, bringing artisanship to your wardrobe in a modern, minimal, and meaningful way.
            Discover kurtis that carry culture… designed for today.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12 mb-10">

          {/* Policies */}
          <div>
            <h3 className="text-[11px] font-light mb-4 tracking-widest uppercase text-white">
              Policies
            </h3>

            <ul className="space-y-2">
              {policyLinks.map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="text-[11px] text-white/80 hover:text-white transition-colors duration-200 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-[11px] font-light mb-4 tracking-widest uppercase text-white">
              Customer Care
            </h3>
            <div className="space-y-3 text-white/80">
              <p className="text-[11px] font-light">Our team usually replies within 24-48 hours.</p>

              <p className="text-[11px] font-normal text-white">
                Customer Care No.{" "}
                <a
                  href="tel:+919381353338"
                  className="text-white/80 hover:text-white font-light"
                >
                  +91 93813 53338
                </a>
              </p>

              <p className="text-[11px] font-normal text-white">
                Email ID{" "}
                <a
                  href="mailto:vinsaraa.official@gmail.com"
                  className="text-white/80 hover:text-white font-light"
                >
                  vinsaraa.official@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Sign Up */}
          <div>
            <h3 className="text-[11px] font-light mb-4 tracking-widest uppercase text-white">
              Sign Up And Save
            </h3>
            <p className="text-[11px] text-white/80 mb-3 font-light">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>

            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-[11px] bg-transparent border border-white/40 text-white placeholder-white/50 focus:outline-none focus:border-white font-light"
                required
              />
              <button
                onClick={handleSubscribe}
                className="px-3 py-2 bg-transparent border border-l-0 border-white/40 hover:border-white transition-colors duration-200"
              >
                <Mail size={14} className="text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden mb-8">
          {[
            {
              id: "policies",
              title: "Policies",
              content: (
                <ul className="space-y-2">
                  {policyLinks.map(([label, link]) => (
                    <li key={label}>
                      <Link
                        to={link}
                        className="text-[11px] text-white/80 hover:text-white transition-colors duration-200 font-light"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "customer",
              title: "Customer Care",
              content: (
                <div className="space-y-3 text-white/80">
                  <p className="text-[11px] font-light">Our team usually replies within 24-48 hours.</p>

                  <p className="text-[11px] font-normal text-white">
                    Customer Care No.{" "}
                    <a
                      href="tel:+919381353338"
                      className="text-white/80 hover:text-white underline font-light"
                    >
                      +91 93813 53338
                    </a>
                  </p>

                  <p className="text-[11px] font-normal text-white">
                    Email ID{" "}
                    <a
                      href="mailto:vinsaraa.official@gmail.com"
                      className="text-white/80 hover:text-white underline font-light"
                    >
                      vinsaraa.official@gmail.com
                    </a>
                  </p>
                </div>
              ),
            },
            {
              id: "signup",
              title: "Sign Up And Save",
              content: (
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-white/80 mb-1 font-light">
                    Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                  </p>

                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 text-[11px] bg-transparent border border-white/40 text-white placeholder-white/50 focus:outline-none focus:border-white font-light"
                      required
                    />
                    <button
                      onClick={handleSubscribe}
                      className="px-3 py-2 bg-transparent border border-l-0 border-white/40 hover:border-white transition-colors duration-200"
                    >
                      <Mail size={14} className="text-white/80" />
                    </button>
                  </div>
                </div>
              ),
            },
          ].map(({ id, title, content }) => (
            <div key={id} className="border-b border-white/20">
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex justify-between items-center py-4 text-[11px] font-light tracking-widest uppercase text-white"
              >
                {title}
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    openSection === id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === id ? "max-h-screen pb-4" : "max-h-0"
                }`}
              >
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {[Instagram].map((Icon, i) => (
            <a
              key={i}
              href="https://www.instagram.com/vinsaraa_official"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-[10px] text-white/60 mb-2 font-light">© 2025 Vinsaraa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
