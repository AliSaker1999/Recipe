import { FaGithub, FaEnvelope, FaUserTie } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-blue-100 via-pink-100 to-blue-200 shadow-inner mt-12">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-t-3xl">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-blue-600 drop-shadow">
        <span className="text-3xl">🍽️</span>
        RecipeLand
      </div>
      {/* Links */}
      <div className="flex flex-wrap gap-5 text-base font-semibold">
        <a
          href="mailto:AliSaker1999@hotmail.com"
          className="flex items-center gap-2 text-blue-700 hover:text-pink-500 transition"
        >
          <FaEnvelope /> AliSaker1999@hotmail.com
        </a>
        <a
          href="https://alisaker1999.github.io/my-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-700 hover:text-pink-500 transition"
        >
          <FaUserTie /> Portfolio
        </a>
        <a
          href="https://github.com/AliSaker1999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-700 hover:text-pink-500 transition"
        >
          <FaGithub /> GitHub
        </a>
      </div>
      {/* Copyright */}
      <div className="text-gray-500 text-sm text-center md:text-right">
        &copy; {new Date().getFullYear()} RecipeLand. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
