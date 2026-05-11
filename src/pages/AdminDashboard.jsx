import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Shield, Search, KeyRound, UserPlus, Megaphone, Newspaper, Heart, Settings, Edit } from 'lucide-react';

export default function AdminDashboard() {
  const [pets, setPets] = useState([]);
  const [reports, setReports] = useState([]);
  const [news, setNews] = useState([]);
  const [happyTails, setHappyTails] = useState([]);
  const [activeTab, setActiveTab] = useState('pets'); // pets, reports, news, happytails, config, account
  
  // Forms states
  const [editPetId, setEditPetId] = useState(null);
  const [newPet, setNewPet] = useState({ name: '', species: 'Cão', breed: '', age: '', size: 'Médio', gender: 'Macho', image: '', description: '', health: '', temperament: '' });
  
  const [editNewsId, setEditNewsId] = useState(null);
  const [newNews, setNewNews] = useState({ title: '', date_str: '', excerpt: '', content: '', image: '', tag: 'Aviso' });
  
  const [editTailId, setEditTailId] = useState(null);
  const [newTail, setNewTail] = useState({ title: '', description: '', image: '' });
  
  const [pixKey, setPixKey] = useState('');

  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '' });
  const [passwordChange, setPasswordChange] = useState({ old_password: '', new_password: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
    
    fetchPets();
    fetchReports();
    fetchNews();
    fetchTails();
    fetchPix();
  }, [navigate]);

  const fetchPets = async () => { const res = await fetch('http://localhost:8000/api/pets'); setPets(await res.json()); };
  const fetchReports = async () => { const res = await fetch('http://localhost:8000/api/reports'); setReports(await res.json()); };
  const fetchNews = async () => { const res = await fetch('http://localhost:8000/api/news'); setNews(await res.json()); };
  const fetchTails = async () => { const res = await fetch('http://localhost:8000/api/happytails'); setHappyTails(await res.json()); };
  const fetchPix = async () => { 
    try {
      const res = await fetch('http://localhost:8000/api/config/pix_key'); 
      const data = await res.json();
      setPixKey(data.value || '');
    } catch { setPixKey(''); }
  };

  const logout = () => { localStorage.removeItem('adminToken'); navigate('/login'); };

  /* Deletion Handlers */
  const handleDeletePet = async (id) => {
    if(!window.confirm("Zerar registro?")) return;
    await fetch(`http://localhost:8000/api/pets/${id}`, { method: 'DELETE' }); fetchPets();
  };
  const handleDeleteReport = async (id) => {
    if(!window.confirm("Remover aviso público?")) return;
    await fetch(`http://localhost:8000/api/reports/${id}`, { method: 'DELETE' }); fetchReports();
  };
  const handleDeleteNews = async (id) => {
    if(!window.confirm("Apagar notícia?")) return;
    await fetch(`http://localhost:8000/api/news/${id}`, { method: 'DELETE' }); fetchNews();
  };
  const handleDeleteTail = async (id) => {
    if(!window.confirm("Remover história da Home?")) return;
    await fetch(`http://localhost:8000/api/happytails/${id}`, { method: 'DELETE' }); fetchTails();
  };

  /* Universal Image Upload */
  const handleImageUpload = async (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8000/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setter(prev => ({ ...prev, image: data.url }));
    } catch(err) { alert("Erro ao subir a fotografia."); }
  };

  /* Creation & Edit Handlers */
  const handleAddPet = async (e) => {
    e.preventDefault();
    const formattedPet = { ...newPet, temperament: newPet.temperament.split(',').map(t => t.trim()) };
    if (editPetId) {
      await fetch(`http://localhost:8000/api/pets/${editPetId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formattedPet) });
      setEditPetId(null);
    } else {
      await fetch('http://localhost:8000/api/pets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formattedPet) });
    }
    fetchPets(); setNewPet({ name: '', species: 'Cão', breed: '', age: '', size: 'Médio', gender: 'Macho', image: '', description: '', health: '', temperament: '' });
  };
  
  const handleAddNews = async (e) => {
    e.preventDefault();
    if (editNewsId) {
      await fetch(`http://localhost:8000/api/news/${editNewsId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newNews) });
      setEditNewsId(null);
    } else {
      await fetch('http://localhost:8000/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newNews) });
    }
    fetchNews(); setNewNews({ title: '', date_str: '', excerpt: '', content: '', image: '', tag: 'Aviso' });
  };
  
  const handleAddTail = async (e) => {
    e.preventDefault();
    if (editTailId) {
      await fetch(`http://localhost:8000/api/happytails/${editTailId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTail) });
      setEditTailId(null);
    } else {
      await fetch('http://localhost:8000/api/happytails', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTail) });
    }
    fetchTails(); setNewTail({ title: '', description: '', image: '' });
  };

  /* Populators */
  const handleEditPetPopulate = (pet) => {
    setNewPet({ name: pet.name, species: pet.species, breed: pet.breed, age: pet.age, size: pet.size, gender: pet.gender, image: pet.image, description: pet.description, health: pet.health, temperament: Array.isArray(pet.temperament) ? pet.temperament.join(', ') : pet.temperament || '' });
    setEditPetId(pet.id);
  };
  const handleEditNewsPopulate = (n) => {
    setNewNews({ title: n.title, date_str: n.date_str, excerpt: n.excerpt, content: n.content, image: n.image, tag: n.tag });
    setEditNewsId(n.id);
  };
  const handleEditTailPopulate = (t) => {
    setNewTail({ title: t.title, description: t.description, image: t.image });
    setEditTailId(t.id);
  };

  const handleUpdatePix = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/config/pix_key', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key_name: 'pix_key', value: pixKey }) });
    alert("Chave PIX atualizada no sistema público!");
  };

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(newAdmin) });
      if(res.ok) alert("Admin criado!"); else alert("Erro/Existente.");
    } catch {}
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--bg-surface)', minHeight: '100vh', borderRadius: '1rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
        <h1 className="heading-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '2rem' }}>
          <Shield color="var(--primary)" size={32} /> Painel Central Acapra
        </h1>
        <button onClick={logout} className="btn outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <LogOut size={18} /> Sair
        </button>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('pets')} className={`btn ${activeTab === 'pets' ? 'btn-primary' : 'outline'}`}>Animais</button>
        <button onClick={() => setActiveTab('reports')} className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'outline'}`}>Denúncias</button>
        <button onClick={() => setActiveTab('news')} className={`btn ${activeTab === 'news' ? 'btn-primary' : 'outline'}`}>Notícias</button>
        <button onClick={() => setActiveTab('happytails')} className={`btn ${activeTab === 'happytails' ? 'btn-primary' : 'outline'}`}>Finais Felizes</button>
        <button onClick={() => setActiveTab('config')} className={`btn ${activeTab === 'config' ? 'btn-primary' : 'outline'}`}>Chave PIX</button>
        <button onClick={() => setActiveTab('account')} className={`btn ${activeTab === 'account' ? 'btn-primary' : 'outline'}`}>Contas</button>
      </div>

      {/* CONTENT: ANIMALS */}
      {activeTab === 'pets' && (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Adicionar Novo Pet</h2>
          <form onSubmit={handleAddPet} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input className="form-input" placeholder="Nome" value={newPet.name} onChange={e => setNewPet({...newPet, name: e.target.value})} required />
             <div style={{ display: 'flex', gap: '0.5rem' }}>
               <select className="form-input" value={newPet.species} onChange={e => setNewPet({...newPet, species: e.target.value})}><option>Cão</option><option>Gato</option></select>
               <input className="form-input" placeholder="Raça" value={newPet.breed} onChange={e => setNewPet({...newPet, breed: e.target.value})} required />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="form-input" placeholder="Idade (ex: 2 anos)" value={newPet.age} onChange={e => setNewPet({...newPet, age: e.target.value})} required />
              <select className="form-input" value={newPet.size} onChange={e => setNewPet({...newPet, size: e.target.value})}><option>Pequeno</option><option>Médio</option><option>Grande</option></select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px dashed var(--border)', padding: '1rem', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 'bold' }}>Arquivo de Foto (Computador) ou URL</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, setNewPet)} style={{ fontSize: '0.9rem' }} />
              <input className="form-input" placeholder="Ou URL Direta:" value={newPet.image} onChange={e => setNewPet({...newPet, image: e.target.value})} required />
            </div>
            <textarea className="form-input" placeholder="Descrição" value={newPet.description} onChange={e => setNewPet({...newPet, description: e.target.value})} required rows={2}></textarea>
            <input className="form-input" placeholder="Temperamento (separado por vírgula)" value={newPet.temperament} onChange={e => setNewPet({...newPet, temperament: e.target.value})} required />
            <input className="form-input" placeholder="Saúde (Vacinado?)" value={newPet.health} onChange={e => setNewPet({...newPet, health: e.target.value})} required />
            <button className="btn btn-primary" type="submit">{editPetId ? 'Atualizar Cadastro' : 'Cadastrar Catálogo'}</button>
          </form>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Search size={20} /> Banco Ativo</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
            {pets.map(pet => (
              <div key={pet.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={pet.image} alt={pet.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div><h3 style={{ margin: 0 }}>{pet.name}</h3><span style={{ fontSize: '0.85rem', color: 'gray' }}>{pet.species} • {pet.breed}</span></div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => handleEditPetPopulate(pet)} style={{ padding: '0.5rem', color: '#1976d2', background: '#e3f2fd', borderRadius: '6px', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                  <button onClick={() => handleDeletePet(pet.id)} style={{ padding: '0.5rem', color: 'red', background: '#ffe6e6', borderRadius: '6px', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* CONTENT: REPORTS */}
      {activeTab === 'reports' && (
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Megaphone size={20} /> Gestão Público de Apelos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {reports.map(rep => (
            <div key={rep.id} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <span style={{ fontWeight: 'bold', color: rep.report_type === 'Perdido' ? 'orange' : 'red', marginBottom: '0.5rem' }}>[{rep.report_type}]</span>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{rep.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'gray' }}>Contato: {rep.contact}</p>
              <button onClick={() => handleDeleteReport(rep.id)} className="btn outline" style={{ marginTop: 'auto', alignSelf: 'flex-start', color: 'red' }}>Aviso Concluído</button>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* CONTENT: NEWS */}
      {activeTab === 'news' && (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Publicar Notícia (Carrossel e Lista)</h2>
          <form onSubmit={handleAddNews} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input className="form-input" placeholder="Título (Curto)" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} required />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <input className="form-input" placeholder="Data (ex: 12 Jan)" value={newNews.date_str} onChange={e => setNewNews({...newNews, date_str: e.target.value})} required />
               <input className="form-input" placeholder="Tag (ex: Evento)" value={newNews.tag} onChange={e => setNewNews({...newNews, tag: e.target.value})} required />
            </div>
            <textarea className="form-input" placeholder="Resumo Chamada" value={newNews.excerpt} onChange={e => setNewNews({...newNews, excerpt: e.target.value})} required rows={2}></textarea>
            <textarea className="form-input" placeholder="Conteúdo da Matéria Completa" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})} required rows={4}></textarea>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px dashed var(--border)', padding: '1rem', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 'bold' }}>Capa da Notícia (Inserir Arquivo Local ou URL)</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, setNewNews)} style={{ fontSize: '0.9rem' }} />
              <input className="form-input" placeholder="Ou URL Direta:" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} required />
            </div>
            <button className="btn btn-primary" type="submit">{editNewsId ? 'Salvar Matéria' : 'Emitir Notícia'}</button>
          </form>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Newspaper size={20} /> Banco de Notícias</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {news.map(n => (
              <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div><h3 style={{ margin: 0 }}>{n.title}</h3><span style={{ fontSize: '0.85rem', color: 'gray' }}>{n.date_str}</span></div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                   <button onClick={() => handleEditNewsPopulate(n)} style={{ color: '#1976d2', border: 'none', background: 'transparent', cursor: 'pointer' }}><Edit size={20}/></button>
                   <button onClick={() => handleDeleteNews(n.id)} style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* CONTENT: HAPPY TAILS */}
      {activeTab === 'happytails' && (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Adicionar Final Feliz na Home</h2>
          <form onSubmit={handleAddTail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input className="form-input" placeholder="Título (Nome do Animal)" value={newTail.title} onChange={e => setNewTail({...newTail, title: e.target.value})} required />
            <textarea className="form-input" placeholder="Motivação / Como está o Pet em casa" value={newTail.description} onChange={e => setNewTail({...newTail, description: e.target.value})} required rows={3}></textarea>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px dashed var(--border)', padding: '1rem', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 'bold' }}>Foto do Felino/Final Feliz (Subir arquivo ou URL)</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, setNewTail)} style={{ fontSize: '0.9rem' }} />
              <input className="form-input" placeholder="Ou URL Direta:" value={newTail.image} onChange={e => setNewTail({...newTail, image: e.target.value})} required />
            </div>
            <button className="btn btn-primary" type="submit">{editTailId ? 'Salvar Alterações' : 'Imortalizar História'}</button>
          </form>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={20} /> Histórias Ativas</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {happyTails.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={t.image} alt={t.title} style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                  <h3 style={{ margin: 0 }}>{t.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                   <button onClick={() => handleEditTailPopulate(t)} style={{ color: '#1976d2', border: 'none', background: 'transparent', cursor: 'pointer' }}><Edit size={20}/></button>
                   <button onClick={() => handleDeleteTail(t.id)} style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* CONTENT: CONFIG GLOBALS */}
      {activeTab === 'config' && (
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', maxWidth: '600px' }}>
         <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Settings size={20} /> Configurações de Banco/PIX</h2>
         <form onSubmit={handleUpdatePix} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Chave PIX da ONG Válida (Muda todo o site):</label>
            <input className="form-input" value={pixKey} onChange={e => setPixKey(e.target.value)} required />
            <button className="btn btn-primary" type="submit">Gravar Nova Chave PIX</button>
         </form>
      </div>
      )}

      {/* CONTENT: ACCOUNT (NEW ADMIN) */}
      {activeTab === 'account' && (
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', maxWidth: '600px' }}>
         <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserPlus size={20} /> Adicionar Membro Administrativo</h2>
         <form onSubmit={handleRegisterAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input className="form-input" placeholder="Nome de Usuário" value={newAdmin.username} onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} required />
            <input type="email" className="form-input" placeholder="E-mail" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} required />
            <input type="password" className="form-input" placeholder="Senha" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} required />
            <button className="btn btn-primary" type="submit">Criar Novo Administrador</button>
         </form>
      </div>
      )}

    </div>
  );
}
