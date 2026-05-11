import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ANIMAIS', path: '/pets' },
    { name: 'DOAÇÕES', path: '/donations' },
    { name: 'COMUNIDADE', path: '/community' },
    { name: 'NOTÍCIAS', path: '/news' },
    { name: 'DENÚNCIAS', path: '/reports' },
    { name: 'SOBRE NÓS', path: '/about' },
  ];
  const userId = localStorage.getItem('userId');

  return (
    <nav className="navbar">
      <div className="container nav-container">
        
        {/* Brand Left */}
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Acapra Logo" style={{ height: '35px', borderRadius: '5px' }} />
          <span className="brand-text">Acapra</span>
        </Link>

        {/* Desktop Menu - Center */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Utilities Right */}
        <div className="nav-right desktop-only">
          <Link to={userId ? '/profile' : '/login'} className="btn btn-outline" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem', color: userId ? 'var(--primary)' : 'inherit', borderColor: userId ? 'var(--primary)' : 'inherit' }}>
            {userId ? 'Meu Perfil' : 'LOG IN'}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="nav-link" 
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to={userId ? '/profile' : '/login'} className="btn btn-outline" onClick={() => setIsOpen(false)}>
             {userId ? 'Meu Perfil' : 'LOG IN'}
          </Link>
        </div>
      )}
    </nav>
  );
}
