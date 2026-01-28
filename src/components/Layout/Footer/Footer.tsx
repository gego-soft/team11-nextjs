"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaInfoCircle,
  FaGamepad,
  FaGift,
  FaTrophy,
  FaMobileAlt,
  FaComments,
  FaPhone,
  FaQuestionCircle,
  FaBalanceScale,
  FaFileAlt,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 mt-auto relative overflow-hidden">
      {/* Waves Effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-white/5 to-transparent clip-path-polygon" />

      <div className="relative z-10 pt-16 px-8 pb-8">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className=" ">
            <div className="mb-4">
              <h2 className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-3xl font-extrabold mb-1 tracking-tight">
                Team 11
              </h2>
              <span className="bg-linear-to-r from-slate-400 via-slate-300 to-slate-400 bg-clip-text text-transparent text-xs font-semibold tracking-widest uppercase block mb-6">
                Fantasy Cricket League
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Join thousands of players earning real money through cricket
              fantasy contests and referral rewards!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-2xl font-extrabold mb-1">
                  ₹50L+
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">
                  Total Earnings
                </div>
              </div>
              <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-2xl font-extrabold mb-1">
                  10K+
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">
                  Active Players
                </div>
              </div>
              <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-2xl font-extrabold mb-1">
                  100+
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">
                  Daily Contests
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:rounded">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { icon: <FaInfoCircle />, text: "About Us", href: "/about-us" },
                {
                  icon: <FaGamepad />,
                  text: "How to Play",
                  href: "/how-to-play",
                },
                {
                  icon: <FaGift />,
                  text: "Referral Program",
                  href: "/referral-program",
                },
                { icon: <FaTrophy />, text: "Contests", href: "/contests" },
                {
                  icon: <FaMobileAlt />,
                  text: "Download App",
                  href: "/download-app",
                },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 text-sm"
                  >
                    <span className="text-blue-400">{link.icon}</span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:rounded">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                {
                  icon: <FaComments />,
                  text: "Help Center",
                  href: "/help-center",
                },
                { icon: <FaPhone />, text: "Contact Us", href: "/contact-us" },
                { icon: <FaQuestionCircle />, text: "FAQs", href: "/faqs" },
                {
                  icon: <FaBalanceScale />,
                  text: "Legality",
                  href: "/legality",
                },
                {
                  icon: <FaFileAlt />,
                  text: "Terms & Conditions",
                  href: "/terms-conditions",
                },
                {
                  icon: <FaLock />,
                  text: "Privacy Policy",
                  href: "/privacy-policy",
                },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 text-sm"
                  >
                    <span className="text-blue-400">{link.icon}</span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-linear-to-r after:from-blue-500 after:to-purple-500 after:rounded">
              Stay Updated
            </h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Get latest contest alerts & exclusive bonuses!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-500"
              />
              <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30">
                Subscribe
              </button>
            </div>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaYoutube />, label: "YouTube" },
                { icon: <FaTelegram />, label: "Telegram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-xl transition-all duration-300 hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:-translate-y-1 hover:rotate-3 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Team 11 Fantasy Cricket. All
              rights reserved.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs inline-flex items-center gap-1">
                <FaShieldAlt className="text-green-400" /> Secure
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs inline-flex items-center gap-1">
                <FaCheckCircle className="text-blue-400" /> Verified
              </span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs inline-flex items-center gap-1">
                <FaBolt className="text-yellow-400" /> Instant Withdrawal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom clip-path utility */}
      <style jsx>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
        }
      `}</style>
    </footer>
  );
}
