import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, User, Activity, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', age: '', location: '', avatar_url: '' });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:8000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({
          full_name: data.full_name || '',
          age: data.age || '',
          location: data.location || '',
          avatar_url: data.avatar_url || ''
        });
      })
      .catch();
  }, [userId, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const bodyForm = new FormData();
    bodyForm.append("file", file);
    try {
      const res = await fetch("http://localhost:8000/api/upload", { method: "POST", body: bodyForm });
      const data = await res.json();
      setFormData(prev => ({ ...prev, avatar_url: data.url }));
    } catch(err) { alert("Erro de rede."); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const updated = await res.json();
      setUser(updated);
      setIsEditing(false);
    } catch {
      alert("Falha ao salvar");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  // Avatar dinâmico
  const defaultAvatar = "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400";
  const avatar = user?.avatar_url || defaultAvatar;

  if (!user) return <div style={{ padding: '4rem', textAlign: 'center' }}>Carregando Perfil...</div>;

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
         
         {/* HEADER PROFILE */}
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
               <img src={avatar} alt="Avatar" style={{ 
                   width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover',
                   border: user.is_admin ? '4px solid #e53935' : '4px solid white',
                   boxShadow: 'var(--shadow-sm)'
               }} />
               {user.is_admin && (
                 <div style={{ position: 'absolute', bottom: '0', right: '-10px', backgroundColor: '#e53935', color: 'white', padding: '0.3rem', borderRadius: '50%' }}>
                    <ShieldCheck size={20} />
                 </div>
               )}
            </div>

            <h1 className="heading-1" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{user.full_name || user.username}</h1>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '1rem', fontWeight: 600 }}>@{user.username}</p>

            {user.is_admin && (
              <span style={{ marginTop: '0.5rem', backgroundColor: '#ffebee', color: '#c62828', padding: '0.2rem 1rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                 Membro Administrador
              </span>
            )}
         </div>

         {/* CONTENT (DISPLAY OR EDIT) */}
         {!isEditing ? (
            <div style={{ display: 'grid', gap: '1.5rem', backgroundColor: 'var(--bg-surface)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <User size={20} color="var(--primary)" /> 
                   <div><span style={{ fontSize: '0.85rem', color: 'gray', display: 'block' }}>Nome Completo</span><span style={{ fontWeight: 600 }}>{user.full_name || 'Não informado'}</span></div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <Activity size={20} color="var(--primary)" /> 
                   <div><span style={{ fontSize: '0.85rem', color: 'gray', display: 'block' }}>Idade</span><span style={{ fontWeight: 600 }}>{user.age || 'Não informado'}</span></div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <MapPin size={20} color="var(--primary)" /> 
                   <div><span style={{ fontSize: '0.85rem', color: 'gray', display: 'block' }}>Localização</span><span style={{ fontWeight: 600 }}>{user.location || 'Não informado'}</span></div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ flex: 1 }}>Editar Perfil</button>
                    {user.is_admin && (
                        <button onClick={() => navigate('/admin')} className="btn outline" style={{ flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                            Painel Central <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
         ) : (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', backgroundColor: 'var(--bg-surface)', padding: '2rem', borderRadius: '12px' }}>
                <div>
                   <label style={{ display: 'block', fontSize: '0.85rem', color: 'gray', marginBottom: '0.3rem' }}>Nova Foto (Arquivo):</label>
                   <input type="file" accept="image/*" onChange={handleImageUpload} className="form-input" style={{ backgroundColor: 'white' }} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.85rem', color: 'gray', marginBottom: '0.3rem' }}>Ou Link Foto (URL):</label>
                   <input className="form-input" value={formData.avatar_url} onChange={(e) => setFormData({...formData, avatar_url: e.target.value})} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.85rem', color: 'gray', marginBottom: '0.3rem' }}>Nome Completo</label>
                   <input className="form-input" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.85rem', color: 'gray', marginBottom: '0.3rem' }}>Idade (ex: 28 anos)</label>
                   <input className="form-input" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.85rem', color: 'gray', marginBottom: '0.3rem' }}>Localidade</label>
                   <input className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Salvar Dados</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="btn outline" style={{ flex: 1 }}>Sair</button>
                </div>
            </form>
         )}

         <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: '#7f8c8d', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                <LogOut size={16} /> Desconectar Conta
            </button>
         </div>

      </div>
    </div>
  );
}
