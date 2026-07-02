import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

export default function Projects() {
  const { data: projects, loading, error } = useFetch(api.getProjects);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ ls projects/
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: 'var(--text)' }}
        >
          Projects
        </motion.h2>

        {loading && (
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            $ loading projects...
          </p>
        )}
        {error && (
          <p className="font-mono text-sm" style={{ color: '#ef4444' }}>
            Could not load projects — is the Django server running?
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {projects?.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden border flex flex-col"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div
                className="h-44 flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, var(--teal-dim, rgba(45,212,191,0.12)), var(--amber-dim, rgba(245,166,35,0.12)))',
                }}
              >
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiFolder size={40} style={{ color: 'var(--teal)' }} />
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>

                {project.features?.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs pl-4 relative"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span className="absolute left-0" style={{ color: 'var(--amber)' }}>
                          ▹
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border"
                      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-transform hover:scale-105"
                      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                    >
                      <FiGithub size={16} /> Code
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: 'var(--teal)', color: '#06110f' }}
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}