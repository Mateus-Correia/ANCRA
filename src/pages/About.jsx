import './About.css';

export default function About() {
  return (
    <div className="about-modern" style={{ backgroundColor: 'var(--bg-base)', padding: '4rem 2rem' }}>
      <div className="container">
        
        {/* Cabecalho */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 className="heading-1" style={{ fontSize: '3rem', color: 'var(--secondary)' }}>
            Nossa <span style={{ color: 'var(--primary)' }}>História</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            A Acapra não é apenas um abrigo temporário; somos uma ponte entre uma segunda chance e um lar feliz.
          </p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div className="about-image-card">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800" alt="Resgate Animal" />
          </div>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>A Missão</span>
            <h2 className="heading-1" style={{ fontSize: '2.2rem', margin: '0.5rem 0 1.5rem 0' }}>Transformar Vidas com Responsabilidade</h2>
            <p style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Nascemos do desejo genuíno de combater o abandono e garantir que cada coração bata num sofá quentinho. Nós resgatamos, recuperamos fisicamente, vacinamos e castramos animais que perderam tudo.
            </p>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
              Localizados no coração de <strong>São-Joaquim (SC)</strong>, acreditamos que quando você adota não está apenas salvando o animal, mas descobrindo uma nova forma de enxergar o amanhã.
            </p>
          </div>
        </div>

        <div className="about-grid flip" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(350px, 1fr)', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Os Valores</span>
            <h2 className="heading-1" style={{ fontSize: '2.2rem', margin: '0.5rem 0 1.5rem 0' }}>Amor que se multiplica</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🐾</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--secondary)' }}>Respeito Pleno</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Avaliamos a personalidade do cão/gato para garantir adoções definitivas perfeitas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏥</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--secondary)' }}>Saúde Antes de Tudo</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Nenhum animal sai para um lar sem estar medicado e devidamente limpo por veterinários parceiros.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-card secondary">
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800" alt="Médico Veterinario e Cão" />
          </div>
        </div>

      </div>
    </div>
  );
}
