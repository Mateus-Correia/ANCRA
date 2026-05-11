import { useState, useEffect } from 'react';
import { MessageSquareWarning, Megaphone, Send, MapPin, XCircle, Trash2 } from 'lucide-react';
import './Reports.css';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    report_type: 'Perdido',
    title: '',
    description: '',
    contact: '',
    image: ''
  });

  const isAdmin = !!localStorage.getItem('adminToken');

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/reports');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ação de Administrador: ZERAR essa postagem pública permanentemente?")) return;
    try {
      await fetch(`http://localhost:8000/api/reports/${id}`, { method: 'DELETE' });
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("file", file);
    try {
      const res = await fetch("http://localhost:8000/api/upload", { method: "POST", body: uploadData });
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.url }));
    } catch(err) { alert("Falha na central ao processar imagem."); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Publicação Registrada! Ela já consta no mural.");
        setFormData({ report_type: 'Perdido', title: '', description: '', contact: '', image: '' });
        fetchReports();
      }
    } catch {
      alert("Erro ao enviar denúncia.");
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '3rem' }}>
        
        {/* Lado Esquerdo - Formulário */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', alignSelf: 'start', position: 'sticky', top: '2rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
              <Megaphone size={28} color="var(--primary)" />
              <h2 className="heading-1" style={{ fontSize: '1.6rem' }}>Novo Alerta</h2>
           </div>
           
           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Tipo de Situação</label>
                <select className="form-input" value={formData.report_type} onChange={(e) => setFormData({...formData, report_type: e.target.value})} required>
                  <option value="Perdido">🐾 Animal Desaparecido</option>
                  <option value="Denúncia">⚠️ Maus Tratos / Abandono</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Título Breve</label>
                <input className="form-input" placeholder="Ex: Cão Branco Perdido no Centro" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} maxLength={60} required />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Descrição Detalhada</label>
                <textarea className="form-input" placeholder="Onde foi visto? Características? Qual a situação?" rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Seu Contato</label>
                <input className="form-input" placeholder="(XX) 9.XXXX-XXXX ou Email" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px dashed var(--border)', padding: '1rem', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--text-secondary)' }}>Foto Real do Animal (Subir Arquivo Local)</label>
                <input type="file" accept="image/*" className="form-input" onChange={handleImageUpload} style={{ backgroundColor: 'white', padding: '0.5rem' }} />
                <input className="form-input" placeholder="Ou usar Link Web" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                 Publicar Alerta <Send size={18} />
              </button>
           </form>
        </div>

        {/* Lado Direito - Mural de Denúncias/Perdidos */}
        <div>
           <div style={{ marginBottom: '3rem' }}>
             <h1 className="heading-1" style={{ fontSize: '2.8rem', color: 'var(--secondary)' }}>Mural de Avisos</h1>
             <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>A rede da comunidade de São-Joaquim trabalhando unida. Acompanhe animais sumidos ou apurações em aberto.</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {reports.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>Nenhum alerta recente emitido na região.</p>}
              
              {reports.map((report) => (
                <div key={report.id} style={{ 
                  backgroundColor: report.report_type === 'Denúncia' ? '#fff5f5' : 'white', 
                  borderLeft: `5px solid ${report.report_type === 'Perdido' ? 'var(--primary)' : '#e53935'}`,
                  padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', position: 'relative'
                }}>
                   <span style={{ 
                     display: 'inline-block', backgroundColor: report.report_type === 'Perdido' ? 'var(--primary-light)' : '#ffebee', 
                     color: report.report_type === 'Perdido' ? 'var(--primary)' : '#c62828', padding: '0.2rem 0.8rem',
                     borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem'
                   }}>{report.report_type}</span>
                   
                   <span style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>{new Date(report.created_at).toLocaleDateString('pt-BR')}</span>
                   
                   {report.image && <img src={report.image} alt={report.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />}

                   <h3 className="heading-1" style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{report.title}</h3>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{report.description}</p>
                   
                   {isAdmin && (
                     <button onClick={() => handleDelete(report.id)} style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', color: '#c62828', border: 'none', background: '#ffebee', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 'bold', fontSize: '0.85rem' }}>
                       Excluir (Admin) <Trash2 size={16} />
                     </button>
                   )}
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)' }}>
                     <MapPin size={16} color="var(--primary)" />
                     <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Contato: {report.contact}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
