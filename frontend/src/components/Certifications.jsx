import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

export default function Certifications() {
  const { data: certifications, loading, error } = useFetch(api.getCertifications);

  return (
    <section id="certifications" className="py-24 px-6" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ cat certifications.json
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: 'var(--text)' }}
        >
          Certifications
        </motion.h2>

        {loading && (
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            $ loading certifications...
          </p>
        )}
        {error && (
          <p className="font-mono text-sm" style={{ color: '#ef4444' }}>
            Could not load certifications — is the Django server running?
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {certifications?.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 border flex gap-4"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--teal-dim, rgba(45,212,191,0.12))' }}
              >
                <FiAward size={22} style={{ color: 'var(--teal)' }} />
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>
                  {cert.title}
                </h3>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--amber)' }}>
                  {cert.issuer}
                  {cert.date_earned && ` · ${cert.date_earned}`}
                </p>
                {cert.description && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {cert.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}