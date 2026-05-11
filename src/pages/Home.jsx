import { Link } from 'react-router-dom';
import { ArrowRight, Dog, Cat } from 'lucide-react';
import PetCard from '../components/PetCard';
import { useState, useEffect } from 'react';
import NewsCarousel from '../components/NewsCarousel';
import './Home.css';

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [happyTails, setHappyTails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/pets?limit=3')
      .then(res => res.json())
      .then(data => setFeaturedPets(data.slice(0,3)))
      .catch(err => console.error(err));
      
    fetch('http://localhost:8000/api/happytails')
      .then(res => res.json())
      .then(data => setHappyTails(data.slice(0,3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-modern">
      
      {/* O Hero Section isola flexbox e overflow */}
      <main className="hero-section">
        {/* Decoração Flutuante de Fundo */}
        <div className="circle-decor c-1"></div>
        <div className="circle-decor c-2"></div>
        <div className="circle-decor c-3"></div>
        <div className="dot-decor d-1"></div>
        <div className="dot-decor d-2"></div>

        <div className="container hero-split">
          {/* Left Side: Typography */}
          <div className="hero-text-side">
            <h1 className="hero-title" style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              <span className="text-orange block-big" style={{ display: 'block', fontSize: '1.2em' }}>Associação</span>
              <span className="text-dark block-medium" style={{ display: 'block', fontSize: '0.8em', marginBottom: '0.4rem' }}>Joaquinense de</span>
              <span className="text-dark block-big" style={{ fontFamily: 'serif', display: 'block', fontSize: '1.4em', color: 'var(--primary)' }}>Proteção aos Animais</span>
            </h1>

            <div className="hero-desc-box">
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
               <Link to="/pets" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', padding: '0.8rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <Dog size={22} /> Adote
               </Link>
               <Link to="/donations" className="btn outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', padding: '0.8rem 2.5rem', backgroundColor: 'white' }}>
                  <Cat size={22} /> Apoie
               </Link>
            </div>
          </div>

          {/* Right Side: Blob Image */}
          <div className="hero-image-side">
            <div className="blob-background">
              <div className="blob-image">
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Cachorro Feliz" 
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewsCarousel />

      <section className="featured-section" style={{ position: 'relative', zIndex: 5, backgroundColor: 'white', marginTop: '3rem', padding: '4rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <h2 className="heading-1" style={{ fontSize: '2.5rem' }}>Últimos resgatados</h2>
            <Link to="/pets" style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
            {featuredPets.length === 0 && <p style={{color: 'var(--text-tertiary)'}}>Nenhum pet cadastrado recetemente na API.</p>}
          </div>
        </div>
      </section>

      {/* Seção Nova: Histórias que Inspiram (Foco Gatos) */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
             <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Finais Felizes</span>
             <h2 className="heading-1" style={{ fontSize: '2.8rem', marginTop: '0.5rem' }}>Histórias Felinas</h2>
             <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Conheça os gatinhos da Acapra que encontraram famílias amorosas e tornaram-se os reis de suas novas casas.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="stories-grid">
            {happyTails.map(tail => (
               <div key={tail.id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }} className="story-card">
                 <img src={tail.image} alt={tail.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                 <div style={{ padding: '1.5rem' }}>
                   <h3 className="heading-1" style={{ fontSize: '1.4rem' }}>{tail.title}</h3>
                   <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{tail.description}</p>
                 </div>
               </div>
            ))}
            {happyTails.length === 0 && <p style={{color: 'var(--text-tertiary)'}}>Nenhuma história registrada ainda.</p>}
          </div>
        </div>
      </section>

      {/* Seção Curiosidades e Fatos */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--primary)' }}>
         <div className="container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: 1, minWidth: '300px', color: 'white' }}>
               <h2 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>Você Sabia?</h2>
               <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>O mundo animal é cheio de surpresas! Adoção vai muito além do amor; envolve entender a natureza incrível do seu novo parceiro de vida.</p>
            </div>
            
            <div style={{ flex: 2, minWidth: '300px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
               
               <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '2rem', borderRadius: '1rem', color: 'white', backdropFilter: 'blur(5px)' }}>
                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🐈</div>
                 <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Nariz Único</h4>
                 <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Assim como nossa impressão digital, o nariz de um gato ou cão tem um padrão de sulcos e rugas único em todo o mundo!</p>
               </div>

               <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '2rem', borderRadius: '1rem', color: 'white', backdropFilter: 'blur(5px)' }}>
                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🐾</div>
                 <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Adoção de Negros</h4>
                 <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Tristemente, cães e gatos de pelagem totalmente preta demoram o triplo de tempo para serem adotados. Eles precisam de amor extra!</p>
               </div>
               
               <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '2rem', borderRadius: '1rem', color: 'white', backdropFilter: 'blur(5px)' }}>
                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💤</div>
                 <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bateria Fraca</h4>
                 <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Não pense que ele é preguiçoso. Gatos saudáveis dormem cerca de 16 horas por dia para conservar sua energia instintiva.</p>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
}
