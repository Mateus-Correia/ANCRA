import './About.css';

export default function Community() {
  const volunteers = [
    { name: "Mariana Souza", role: "Coordenação", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    { name: "João Silva", role: "Resgatista", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { name: "Dr. Roberto", role: "Veterinário Parceiro", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>A Mão que Cuida</span>
          <h1 className="heading-1" style={{ fontSize: '3rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>
            A Nossa <span style={{ color: 'var(--primary)' }}>Comunidade</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem', maxWidth: '700px', margin: '1rem auto' }}>
            A Acapra de São-Joaquim sobrevive graças a guerreiros incansáveis. 
            Conheça o rosto humano que se voluntaria em feiras, resgatando na chuva de nossas calçadas.
          </p>
        </div>

        {/* Volunteers Grid with Blobs */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6rem' }}>
          {volunteers.map((vol, index) => (
             <div key={index} style={{ textAlign: 'center', width: '250px' }}>
               <div style={{ 
                 width: '180px', height: '180px', margin: '0 auto 1.5rem auto', 
                 borderRadius: index % 2 === 0 ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '60% 40% 30% 70% / 60% 30% 70% 40%', 
                 overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '4px solid var(--primary-light)',
                 transition: 'all 0.4s ease'
                }} className="about-image-card">
                  <img src={vol.image} alt={vol.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
               <h3 className="heading-1" style={{ fontSize: '1.4rem' }}>{vol.name}</h3>
               <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{vol.role}</span>
             </div>
          ))}
        </div>

        {/* Call to action for Volunteering */}
        <div style={{ 
          backgroundColor: 'var(--secondary)', color: 'white', padding: '4rem 3rem', 
          borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', 
          alignItems: 'center', flexWrap: 'wrap', gap: '2rem' 
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 800 }}>Faça Parte da Equipe</h2>
            <p style={{ color: '#E5E5E5', fontSize: '1.1rem' }}>
              Seja o farol de esperança na vida de cães e gatos abanonados! Precisamos de pessoas para dar carona solidária, abrigos temporários ou ajudar nas redes sociais da Acapra.
            </p>
          </div>
          <button className="btn" style={{ backgroundColor: 'white', color: 'var(--secondary)', fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Seja Voluntário
          </button>
        </div>

      </div>
    </div>
  );
}
