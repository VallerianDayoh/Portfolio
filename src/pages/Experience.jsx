import { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  // Ambil data dari JSON Server
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get("http://localhost:3001/experience");
        setExperience(res.data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };
    fetchExperience();
  }, []);

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Garis timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300 md:left-1/2"></div>

          <div className="space-y-12 relative z-10">
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative ${
                  index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
                }`}
              >
                {/* Titik timeline */}
                <div className="absolute left-6 w-5 h-5 rounded-full bg-blue-600 border-4 border-gray-50 md:left-1/2 md:ml-[-10px] z-10"></div>

                {/* Card pengalaman */}
                <div className="ml-16 md:ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 transition hover:shadow-xl border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    {/* Icon Briefcase dari React Icons */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                      <FaBriefcase />
                    </div>

                    {/* Isi card */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.position}
                        </h3>

                        {exp.current && (
                          <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                          Key Achievements:
                        </p>
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <FaCheckCircle className="text-blue-600 mt-0.5" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
