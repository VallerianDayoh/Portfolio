import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaBirthdayCake } from "react-icons/fa";

const About = () => {
  const [profile, setProfile] = useState(null);

  // Ambil data profil dari JSON Server
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

  if (!profile) return null;

  // Format tanggal lahir
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Gunakan icon dari react-icons di tiap item
  const infoItems = [
    { icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />, label: "Location", value: profile.location },
    { icon: <FaEnvelope className="text-blue-600 text-xl" />, label: "Email", value: profile.email },
    { icon: <FaPhoneAlt className="text-blue-600 text-xl" />, label: "Phone", value: profile.phone },
    { icon: <FaBirthdayCake className="text-blue-600 text-xl" />, label: "Birth Date", value: formatDate(profile.birthdate) },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Kartu biodata */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-10 transition duration-300 hover:shadow-xl">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            {profile.bio}
          </p>

          {/* Grid informasi pribadi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-lg bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white break-words">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
