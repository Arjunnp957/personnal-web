import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

export default function Contact() {
  const { data: profile } = useFetch(api.getProfile);
  const person = profile?.[0];

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm mb-3"
          style={{ color: 'var(--teal)' }}
        >
          $ ./contact.sh
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: 'var(--text)' }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-5"
          >
            {person?.email && (
              <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <FiMail style={{ color: 'var(--teal)' }} /> {person.email}
              </a>
            )}
            {person?.phone && (
              <a href={`tel:${person.phone}`} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <FiPhone style={{ color: 'var(--teal)' }} /> {person.phone}
              </a>
            )}
            {person?.location && (
              <p className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <FiMapPin style={{ color: 'var(--teal)' }} /> {person.location}
              </p>
            )}
            <div className="flex gap-4 pt-2">
              {person?.github_url && (
                <a href={person.github_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <FiGithub size={20} />
                </a>
              )}
              {person?.linkedin_url && (
                <a href={person.linkedin_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <FiLinkedin size={20} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 disabled:opacity-60"
              style={{ backgroundColor: 'var(--teal)', color: '#06110f' }}
            >
              <FiSend size={16} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm" style={{ color: 'var(--teal)' }}>
                Message sent — thank you! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm" style={{ color: '#ef4444' }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}