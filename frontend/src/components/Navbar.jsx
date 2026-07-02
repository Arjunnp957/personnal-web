import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-lg shadow-lg' : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-lg font-semibold" style={{ color: 'var(--teal)' }}>
          &lt;ArjunP /&gt;
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:opacity-70 transition-opacity"
            style={{ color: 'var(--text)' }}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'var(--text)' }}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6" style={{ backgroundColor: 'var(--surface)' }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}