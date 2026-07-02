import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

export default function Experience() {
  const { data: experiences, loading, error } = useFetch(api.getExperience);

  return (
    <section id="experience" className="py-24 px-6" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ git log --experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-14"
          style={{ color: 'var(--text)' }}
        >
          Experience
        </motion.h2>

        {loading && (
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            $ loading experience...
          </p>
        )}
        {error && (
          <p className="font-mono text-sm" style={{ color: '#ef4444' }}>
            Could not load experience — is the Django server running?
          </p>
        )}

        <div className="relative border-l pl-8 space-y-14" style={{ borderColor: 'var(--border)' }}>
          {experiences?.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4"
                style={{ backgroundColor: 'var(--teal)', borderColor: 'var(--surface)' }}
              />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  {exp.role}
                </h3>
                <span className="font-mono text-xs px-2 py-1 rounded" style={{ color: 'var(--amber)', backgroundColor: 'var(--amber-dim, rgba(245,166,35,0.1))' }}>
                  {exp.start_date} — {exp.end_date}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5">
                  <FiBriefcase size={14} /> {exp.company}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1.5">
                    <FiMapPin size={14} /> {exp.location}
                  </span>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {exp.responsibilities?.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm leading-relaxed pl-4 relative"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="absolute left-0" style={{ color: 'var(--teal)' }}>▹</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}