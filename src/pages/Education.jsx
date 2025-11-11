import { useState, useEffect } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa"; 

// Fungsi format tanggal dasar menjadi "Month Year"
const formatSingleDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
};

const Education = () => {
  const [education, setEducation] = useState([]);

  // Ambil data education dari JSON Server
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get("http://localhost:3001/education");
        setEducation(res.data);
      } catch (err) {
        console.error("Error fetching education:", err);
      }
    };
    fetchEducation();
  }, []);

  //  Format tanggal menjadi "Month Year" dan menangani "Current"
  const formatDateRange = (startDateString, endDateString) => {
    const formattedStart = formatSingleDate(startDateString);

    // Cek jika endDateString adalah "null", null, atau string kosong
    if (endDateString === "null" || endDateString === null || endDateString === "") {
        return `${formattedStart} - Current`;
    }
    
    const formattedEnd = formatSingleDate(endDateString);
    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Judul section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-3">Education</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Garis timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-slate-700 rounded-full"></div>

          <div className="space-y-12 relative z-10">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`relative ${
                  index % 2 === 0
                    ? "md:pr-[52%]"
                    : "md:pl-[52%] md:ml-auto"
                }`}
              >
                {/* Titik timeline */}
                <div className="absolute left-6 md:left-1/2 md:-ml-2 top-6 w-4 h-4 bg-blue-600 rounded-full shadow-lg"></div>

                {/* Card Education */}
                <div className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all rounded-xl p-6 md:p-8 ml-12 md:ml-0">
                  <div className="flex items-start gap-4">
                    {/* React Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-2xl">
                      <FaGraduationCap />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {edu.field}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm font-medium text-blue-600 mb-2">
                          GPA: {edu.gpa}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {edu.description}
                      </p>
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

export default Education;