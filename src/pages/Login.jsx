import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, EyeOff, ArrowLeft } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(isRegisterMode) {
      try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) throw new Error('Usuário ou e-mail já existente');
        alert("Conta registrada! Pode efetuar o login.");
        setIsRegisterMode(false);
      } catch (err) { setError(err.message); }
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Credenciais inválidas');
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('isAdmin', data.is_admin);
      
      if (data.is_admin === 1) navigate('/admin');
      else navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-diagonal-layout">
      {/* Left Diagonal Image Section */}
      <div className="login-image-section">
        <div className="login-image-overlay">
          <div className="brand-login" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <img src="/logo.png" alt="Acapra Logo" style={{ height: '60px', marginBottom: '1rem', background: 'white', padding: '5px', borderRadius: '10px' }} />
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Acapra</span>
              <span style={{ color: 'var(--primary)' }}> Admin</span>
            </div>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Hands and Paws" 
          className="login-bg-img"
        />
      </div>

      {/* Right Minimal Form Section */}
      <div className="login-form-section">
        <div className="login-form-container" style={{ position: 'relative' }}>
          <Link to="/" style={{ position: 'absolute', top: '-40px', left: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Voltar para o Site
          </Link>

          <h1 className="heading-1" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
             {isRegisterMode ? 'Criar Conta' : 'Bem-vindo de Volta'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontWeight: 500 }}>
             {isRegisterMode ? 'Junte-se à Acapra como membro oficial.' : 'Acesse sua conta para continuar nossa jornada juntos.'}
          </p>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div style={{ color: 'red', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            
            <div className="input-group">
              <input 
                type="text" 
                className="form-input" 
                placeholder="E-mail ou Nome de Usuário (Acesso único)" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {isRegisterMode && (
              <div className="input-group">
                <input type="email" className="form-input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            )}
            
            <div className="input-group" style={{ position: 'relative' }}>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="pw-toggle">
                <EyeOff size={20} color="var(--text-tertiary)" />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-0.5rem' }}>
              <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {isRegisterMode ? 'Já tenho uma conta' : 'Não sou registrado. Criar Perfil Público'}
              </button>
              <a href="#" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{isRegisterMode ? '' : 'Esqueceu sua senha?'}</a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', backgroundColor: 'var(--primary-light)', color: 'var(--text-primary)', boxShadow: 'none', border: 'none' }}>
              {isRegisterMode ? 'CADASTRAR-ME' : 'LOG IN'}
            </button>
          </form>

          <div className="login-divider">
            <span className="divider-text">ou</span>
          </div>

          <div className="social-login-group">
            <button type="button" className="social-login-btn">
              <Mail size={18} color="#DB4437" /> Entrar com Google
            </button>
            <button type="button" className="social-login-btn">
              <span style={{fontWeight:800, color:"#4267B2"}}>f</span> Entrar com Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
