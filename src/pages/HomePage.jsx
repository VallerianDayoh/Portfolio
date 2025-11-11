import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaLaptopCode } from "react-icons/fa";

const HomePage = () => {
  const [profile, setProfile] = useState(null);

  // Ambil data profil dari JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:3001/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // Tampilan loading sebelum data profil dimuat
  if (!profile) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700"
      >
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </section>
    );
  }

  // Fungsi scroll halus menuju section "Contact"
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Section Hero utama
    <section
      id="hero"
      className="min-h-screen flex relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white md:justify-center"
    >
      {/* Elemen dekorasi blur di latar belakang */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Kontainer utama isi hero */}

      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10 pt-28 pb-10 md:pt-40"> 
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-16">
          
          {/* Bagian teks dan tombol */}
          <div className="flex-1 space-y-6 animate-fade-in-up text-left">
            {/* Nama dan jabatan */}
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-medium opacity-90">
                Hello, I'm
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {profile.name}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white/90">
                {profile.title}
              </h2>
            </div>

            <p className="text-sm md:text-base text-white/80 max-w-lg">
              {profile.tagline}
            </p>


            {/* button get in touch dgn view my work */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg shadow hover:bg-white/90 transition-transform hover:scale-105 flex items-center gap-2"
              >
                <FaEnvelope className="text-blue-700 text-xl" />
                Get In Touch
              </button>

              <button
                onClick={() => window.open(profile.social.github, "_blank")}
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 font-semibold transition flex items-center gap-2"
              >
                <FaLaptopCode className="text-white text-xl" />
                View My Work
              </button>
            </div>

            {/* Ikon sosial media (pakai react-icons) */}
            <div className="flex gap-4 pt-4">
              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-2xl"
                >
                  <FaGithub />
                </a>
              )}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-2xl"
                >
                  <FaLinkedin className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-2xl"
                >
                  <FaTwitter className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-2xl"
                >
                  <FaInstagram className="h-5 w-5 text-gray-800 dark:text-white group-hover:text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Foto profil dengan efek glow */}
          <div
            className="flex-shrink-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative flex justify-center md:justify-end">
              {/* Efek blur cahaya di belakang foto */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
              
              {/* Foto profil */}
              <img
                src={profile.photo}
                alt={profile.name}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/30 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;