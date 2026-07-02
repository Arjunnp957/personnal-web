import { motion } from 'framer-motion';
import { FiBriefcase, FiBook, FiHeart } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'College of Engineering Thalassery, Kannur',
    period: '2024 – 2026',
  },
  {
    degree: 'Bachelor of Computer Science (BSc)',
    school: 'College of Applied Science Pattuvam, Kannur',
    period: '2021 – 2024',
  },
];

const INTERESTS = ['AI & Machine Learning', 'Data Analytics', 'Open Source', 'System Design'];

export default function About() {
  const { data: profile, loading } = useFetch(api.getProfile);
  const person = profile?.[0];

  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ cat about.md
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: 'var(--text)' }}
        >
          About Me
        </motion.h2>

        {!loading && person && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-base md:text-lg leading-relaxed mb-14"
            style={{ color: 'var(--text-muted)' }}
          >
            {person.about}
          </motion.p>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiBook style={{ color: 'var(--amber)' }} />
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
                Education
              </h3>
            </div>
            <ul className="relative ml-2 border-l pl-6 space-y-6" style={{ borderColor: 'var(--border)' }}>
              {EDUCATION.map((edu) => (
                <li key={edu.degree} className="relative">
                  <span
                    className="absolute -left-[29px] top-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--teal)' }}
                  />
                  <p className="font-medium" style={{ color: 'var(--text)' }}>
                    {edu.degree}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {edu.school}
                  </p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--teal)' }}>
                    {edu.period}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiHeart style={{ color: 'var(--amber)' }} />
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
                Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-8 mb-4">
              <FiBriefcase style={{ color: 'var(--amber)' }} />
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
                Current Focus
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {person?.title} building production-grade full-stack apps with Django, React, and PostgreSQL.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}