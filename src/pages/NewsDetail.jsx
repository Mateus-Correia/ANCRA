import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/news/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <div style={{ padding: '5rem', textAlign: 'center' }}>Carregando Artigo...</div>;

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '80vh', paddingBottom: '4rem' }}>
      {/* Article Hero */}
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
         <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
         
         <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', zIndex: 10 }}>
            <Link to="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 600, marginBottom: '2rem', textDecoration: 'underline' }}>
              <ArrowLeft size={18} /> Voltar para Notícias
            </Link>
            <h1 className="heading-1" style={{ color: 'white', fontSize: '3.5rem', lineHeight: 1.1, textShadow: '2px 2px 4px rgba(0,0,0,0.4)', maxWidth: '900px' }}>
              {article.title}
            </h1>
         </div>
      </div>

      <div className="container" style={{ maxWidth: '800px', marginTop: '-2rem', position: 'relative', zIndex: 11 }}>
         <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: 'var(--shadow-md)' }}>
           
           <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={18} /> {article.date_str}</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Tag size={18} /> {article.tag}</span>
           </div>

           <div style={{ color: 'var(--text-primary)', fontSize: '1.2rem', lineHeight: 1.8 }}>
             {/* Simple line break renderer */}
             {article.content.split('\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
             ))}
           </div>

         </div>
      </div>
    </div>
  );
}
