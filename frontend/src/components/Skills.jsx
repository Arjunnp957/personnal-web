import { motion } from 'framer-motion';
import { getSkillIcon } from '../utils/skillIcons';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

export default function Skills() {
  const { data: categories, loading, error } = useFetch(api.getSkills);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ ls skills/
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: 'var(--text)' }}
        >
          Skills &amp; Technologies
        </motion.h2>

        {loading && (
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            $ loading skills...
          </p>
        )}

        {error && (
          <p className="font-mono text-sm" style={{ color: '#ef4444' }}>
            Could not load skills — is the Django server running?
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <h3
                className="font-mono text-sm font-semibold mb-4"
                style={{ color: 'var(--amber)' }}
              >
                // {category.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    {(() => {
                      const Icon = getSkillIcon(skill.name);
                      return <Icon size={14} style={{ color: 'var(--teal)' }} />;
                    })()}
                    {skill.name}
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