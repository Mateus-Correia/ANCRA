import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="Acapra Logo" style={{ height: '30px', borderRadius: '5px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Acapra</span>
          </div>
          <p className="footer-desc">
            Dedicados a encontrar lares amorosos e responsáveis para animais resgatados.
            Cada adoção salva uma vida.
          </p>
          {/* Movidos para o menu de Contato */}
        </div>

        <div className="footer-links">
          <h3>Links Rápidos</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/pets">Animais para Adoção</Link></li>
            <li><Link to="/about">Sobre Nós</Link></li>
            <li><a href="#">Como Ajudar</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contato</h3>
          <ul>
            <li><MapPin size={18} /> São-Joaquim, SC</li>
            <li><Phone size={18} /> (11) 99999-9999</li>
            <li><Mail size={18} /> contato@acapra.org.br</li>
          </ul>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
             <a href="#" className="social-icon" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', fontWeight: 'bold', fontSize: '0.7rem', color: 'var(--text-secondary)', border: '1px solid var(--border)', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>FB</a>
             <a href="#" className="social-icon" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', fontWeight: 'bold', fontSize: '0.7rem', color: 'var(--text-secondary)', border: '1px solid var(--border)', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>IG</a>
             <a href="#" className="social-icon" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', fontWeight: 'bold', fontSize: '0.7rem', color: 'var(--text-secondary)', border: '1px solid var(--border)', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>X</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ONG Acapra. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
