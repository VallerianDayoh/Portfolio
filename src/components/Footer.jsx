import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";

const Footer = () => {
  const [profile, setProfile] = useState(null);

  // Hook untuk mengambil data profil dari JSON Server saat komponen dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Daftar tautan navigasi untuk Quick Links
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  // Fungsi untuk scroll halus ke section yang dipilih
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!profile) return null; // Jangan render footer jika data belum tersedia

  return (
    // Bagian Utama Footer
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Kontainer Kolom Utama Footer (Brand, Links, Social) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Kolom 1: Brand / Profil Singkat */}
          <div>
            {/* Tautan ke atas (Hero) menggunakan inisial nama */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="text-2xl font-bold text-blue-600 inline-block mb-4"
            >
              {/* Menampilkan inisial nama (contoh: John Doe -> JD) */}
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </a>
            {/* Deskripsi Singkat */}
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Full Stack Developer passionate about creating elegant solutions
              through code.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Social Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Connect With Me
            </h3>
            {/* Kontainer ikon-ikon media sosial */}
            <div className="flex gap-3">
              {/* GitHub Link */}
              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  {/* Ikon GitHub */}
                  <FaGithub className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
              {/* LinkedIn Link */}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  {/* Ikon LinkedIn */}
                  <FaLinkedin className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
              {/* Twitter Link */}
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  {/* Ikon Twitter */}
                  <FaTwitter className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
              {/* Instagram Link */}
              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  {/* Ikon Instagram */}
                  <FaInstagram className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar (Copyright & Credits) */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Teks Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          {/* Teks Credits (Made with React Js) */}
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Project Mid Kelas Front-End
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;