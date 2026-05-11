import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NewsCarousel.css';

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/news')
      .then(res => res.json())
      .then(data => { setNews(data.slice(0, 4)); }) // Mostra 4 mais recentes conforme pedido
      .catch(err => console.error(err));
  }, []);

  const nextSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  useEffect(() => {
    const timer = setInterval(() => { nextSlide(); }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, news]);

  if(news.length === 0) return null;

  return (
    <section className="news-section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
             <Newspaper size={20} color="var(--primary)" />
             <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Fique por Dentro</h2>
           </div>
           <Link to="/news" style={{ fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem' }}>Ver todas <ChevronRight size={14} /></Link>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-control left" onClick={prevSlide}><ChevronLeft size={24} /></button>
          
          <div className="carousel-content">
            <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex', width: '100%' }}>
              {news.map((item, index) => (
                <div key={index} className="news-card" style={{ flex: '0 0 100%', minWidth: '100%', display: 'flex' }}>
                   <div className="news-image">
                     <span className="news-tag">{item.tag}</span>
                     <img src={item.image} alt={item.title} />
                   </div>
                   <div className="news-info">
                     <span className="news-date">{item.date_str}</span>
                     <h3 className="heading-1">{item.title}</h3>
                     <p>{item.excerpt}</p>
                     <button className="read-more">Ler Artigo Completo <ChevronRight size={16}/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control right" onClick={nextSlide}><ChevronRight size={24} /></button>
        </div>
        
        <div className="carousel-dots">
          {news.map((_, i) => (
            <button key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
