import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';

const ROLES = ['Software Developer', 'Full Stack Engineer', 'Django + React Developer'];

function useTypingEffect(words, speed = 80, pause = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text.length < currentWord.length) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const { data: profile, loading } = useFetch(api.getProfile);
  const person = profile?.[0];
  const typedText = useTypingEffect(ROLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, var(--teal-dim, rgba(45,212,191,0.08)), transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center"
      >
        {!loading && person && (
          <>
            <p className="font-mono text-sm mb-4" style={{ color: 'var(--teal)' }}>
              $ whoami
            </p>

            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              {person.name}
            </h1>

            <p
              className="font-mono text-lg md:text-xl mb-6 h-8"
              style={{ color: 'var(--amber)' }}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </p>

            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              {person.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {person.resume_file && (
                <a
      
                  href={person.resume_file}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
                  style={{ backgroundColor: 'var(--teal)', color: '#06110f' }}
                >
                  <FiDownload /> Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border transition-transform hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              >
                <FiMail /> Contact Me
              </a>
            </div>

            <div className="flex items-center justify-center gap-6">
              {person.github_url && (
                <a href={person.github_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <FiGithub size={22} />
                </a>
              )}
              {person.linkedin_url && (
                <a href={person.linkedin_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <FiLinkedin size={22} />
                </a>
              )}
              <a href={`mailto:${person.email}`} style={{ color: 'var(--text-muted)' }}>
                <FiMail size={22} />
              </a>
            </div>
          </>
        )}

        {loading && (
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            $ loading profile...
          </p>
        )}
      </motion.div>
    </section>
  );
}