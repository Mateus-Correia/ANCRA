import { HeartHandshake, Box, MapPin, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Donations() {
  const [pixKey, setPixKey] = useState('Carregando...');

  useEffect(() => {
    fetch('http://localhost:8000/api/config/pix_key')
       .then(res => res.json())
       .then(data => setPixKey(data.value || 'pix@acapra.org.br'))
       .catch(() => setPixKey('pix@acapra.org.br'));
  }, []);

  const copiarChave = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Chave PIX copiada para a área de transferência!');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="heading-1" style={{ fontSize: '3rem', color: 'var(--secondary)' }}>
            Como <span style={{ color: 'var(--primary)' }}>Ajudar</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Nenhum ato de bondade, por menor que seja, é desperdiçado.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          {/* Doação Financeira (PIX) */}
          <div style={{ 
            backgroundColor: 'var(--primary-light)', padding: '3rem 2rem', 
            borderRadius: 'var(--radius-lg)', textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
             <div style={{ backgroundColor: 'white', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
               <HeartHandshake size={32} color="var(--primary)" />
             </div>
             <h2 className="heading-1" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Financiamento PIX</h2>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
               Contribua clinicamente. Com os fundos, nós compramos ração, remédios e custeamos as cirurgias de castração.
             </p>
             <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pixKey}</span>
               <button onClick={copiarChave} style={{ color: 'var(--primary)', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                 Copiar <Copy size={16} />
               </button>
             </div>
          </div>

          {/* Doação de Mantimentos */}
          <div style={{ 
            backgroundColor: 'white', padding: '3rem 2rem', 
            borderRadius: 'var(--radius-lg)', textAlign: 'center',
            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)'
          }}>
             <div style={{ backgroundColor: 'var(--bg-surface)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
               <Box size={32} color="var(--primary)" />
             </div>
             <h2 className="heading-1" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Itens Físicos</h2>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
               Nossa sede aceita doação recorrente de mantimentos e insumos hospitalares. O que você não utiliza ou sobra pode salvar uma vida na Acapra.
             </p>
             <ul style={{ listStyle: 'none', color: 'var(--text-primary)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 500, backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px' }}>
               <li>✔️ Cobertores para baixas temperaturas da Serra.</li>
               <li>✔️ Rações abertas (Cães e Gatos).</li>
               <li>✔️ Fitas adesivas, luvas de proteção.</li>
               <li>✔️ Caixas de transportes antigas.</li>
             </ul>
             
             <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <MapPin size={24} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem' }}>Os itens podem ser deixados diretamente no nosso ponto de Coleta em <strong>São-Joaquim, SC.</strong></span>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
