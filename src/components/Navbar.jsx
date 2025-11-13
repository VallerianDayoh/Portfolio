import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mendeteksi apakah user sudah scroll ke bawah
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Daftar menu navigasi
  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  // Fungsi untuk scroll halus
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); 
    }
  };
  
  // Menentukan warna teks berdasarkan keadaan scroll
  const textColor = isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white";

  return (
    // Kontainer Navbar Utama
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-xl dark:bg-slate-900/90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto"> 
        
        {/* Kontainer Desktop/Logo/Hamburger */}
        <div className="flex items-center justify-between md:h-20 px-6 py-4">
          
          {/* Logo / Profile Icon */}
          <a
            href="#hero"
            className="flex items-center gap-3" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
          >
            {/* Ikon Profil */}
            <div className={`
              w-12 h-12 
              md:w-12 md:h-12 
              rounded-xl
              bg-blue-600 
              text-white 
              flex items-center justify-center 
              font-bold 
              text-lg 
              shadow-md 
              transition-colors
            `}>
              <FaUserCircle className="text-2xl md:text-3xl" /> 
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`text-sm font-medium ${textColor} hover:text-blue-400 transition`}
              >
                {item.label}
              </a>
            ))}

            {/* Tombol "Get In Touch" (CTA) */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get In Touch
            </button>
          </div>

          {/* Tombol Menu Mobile (Hamburger/Close Icon) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl p-2 rounded-lg transition ${isScrolled ? 'text-blue-600 hover:bg-blue-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Dropdown Menu Mobile dengan Animasi Transisi */}
        <div 
            className={`
                md:hidden 
                overflow-hidden 
                transition-all duration-500 ease-in-out
                border-t border-gray-200 dark:border-gray-700
                shadow-xl
                ${isScrolled 
                    ? 'bg-white/90 dark:bg-slate-900/90' 
                    : 'bg-blue-900/95 dark:bg-blue-900/95' 
                } 
                backdrop-blur-md 
                ${isMobileMenuOpen ? 'max-h-screen opacity-100 pt-4 pb-4' : 'max-h-0 opacity-0 pt-0 pb-0'} 
            `}
        >
          <div className="flex flex-col gap-1 px-6"> 
            {/* Daftar Link Navigasi Mobile */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`text-base font-medium transition px-3 py-3 rounded-lg text-left 
                  ${isScrolled 
                    ? 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-slate-700/70' 
                    : 'text-white hover:bg-white/10' 
                  }
                `}
              >
                {item.label}
              </a>
            ))}
            
            {/* Tombol "Get In Touch" Mobile (CTA) */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-white text-blue-800 px-5 py-3 rounded-lg font-semibold hover:bg-blue-50 transition w-full mt-4" 
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;