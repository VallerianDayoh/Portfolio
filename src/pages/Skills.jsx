import { useEffect, useState } from "react";
import axios from "axios";
// ⚠️ PERUBAHAN: Menambahkan FaPencilAlt untuk kategori 'editing'
import { FaCode, FaDatabase, FaTools, FaPalette, FaPencilAlt } from "react-icons/fa";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:3001/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  // Fungsi pilih ikon sesuai kategori
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <FaPalette className="text-blue-600 text-2xl" />;
      case "backend":
        return <FaDatabase className="text-green-600 text-2xl" />;
      case "tools":
        return <FaTools className="text-yellow-600 text-2xl" />;
      // ⚠️ Kategori BARU: EDITING
      case "editing":
        return <FaPencilAlt className="text-red-600 text-2xl" />; // Menggunakan FaPencilAlt dengan warna merah
      default:
        return <FaCode className="text-purple-600 text-2xl" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-3">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Daftar Skill */}
        <div className="max-w-5xl mx-auto space-y-10">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl border border-gray-200 dark:border-slate-700"
            >
              {/* Header Kategori */}
              <div className="flex items-center gap-3 mb-6">
                {getCategoryIcon(category)}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {category}
                </h3>
              </div>

              {/* Skill List */}
              <div className="space-y-5">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                          {skill.name}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;