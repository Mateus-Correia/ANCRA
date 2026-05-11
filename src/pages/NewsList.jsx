import { useState, useEffect } from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Newspaper size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 className="heading-1" style={{ fontSize: '3rem', color: 'var(--secondary)' }}>
            Mural de <span style={{ color: 'var(--primary)' }}>Notícias</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Acompanhe nossos resgates, vitórias e eventos em São Joaquim.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {news.map(item => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s' }} className="news-grid-card">
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{item.tag}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.85rem' }}>{item.date_str}</span>
                 </div>
                 <h2 className="heading-1" style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{item.title}</h2>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>{item.excerpt}</p>
                 
                 <Link to={`/news/${item.id}`} style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                    Ler Artigo <ArrowRight size={18} />
                 </Link>
              </div>
            </div>
          ))}
          {news.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', gridColumn: '1 / -1' }}>Nenhuma notícia foi publicada na timeline histórica ainda.</p>}
        </div>
      </div>
    </div>
  );
}
