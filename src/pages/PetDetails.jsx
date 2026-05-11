import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Heart, X } from 'lucide-react';
import './PetDetails.css';

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    phone: '',
    email: '',
    address: '',
    reason: ''
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/pets')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setPet(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error", err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        pet_id: pet.id,
        pet_name: pet.name
      };

      const response = await fetch('http://localhost:8000/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Clear form
        setFormData({
          applicant_name: '',
          phone: '',
          email: '',
          address: '',
          reason: ''
        });
      } else {
        alert("Ocorreu um erro ao enviar seu pedido. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error("Error submitting adoption request:", err);
      alert("Erro de conexão. Verifique sua rede e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsSuccess(false), 300); // reset success state after animation
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Carregando pet...</h2></div>;
  }

  if (!pet) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Animal não encontrado na base de dados.</h2>
        <Link to="/pets" className="btn btn-primary" style={{ marginTop: '2rem' }}>Voltar para Animais</Link>
      </div>
    );
  }

  return (
    <div className="pet-details-page">
      <div className="container">
        <Link to="/pets" className="back-link">
          <ArrowLeft size={20} /> Voltar para a lista
        </Link>
        
        <div className="details-card">
          <div className="details-image-container">
            <img src={pet.image} alt={pet.name} className="details-image" />
          </div>
          
          <div className="details-info">
            <div className="info-header">
              <div>
                <span className="species-badge">{pet.species}</span>
                <h1 className="heading-2" style={{ marginTop: '0.5rem', marginBottom: 0 }}>{pet.name}</h1>
                <p className="breed-text">{pet.breed}</p>
              </div>
              <div className="gender-icon">
                {pet.gender === 'Fêmea' ? '♀' : '♂'}
              </div>
            </div>

            <div className="quick-info-grid">
              <div className="quick-info-item">
                <span className="label">Idade</span>
                <span className="value">{pet.age}</span>
              </div>
              <div className="quick-info-item">
                <span className="label">Porte</span>
                <span className="value">{pet.size}</span>
              </div>
              <div className="quick-info-item">
                <span className="label">Gênero</span>
                <span className="value">{pet.gender}</span>
              </div>
            </div>

            <div className="section-block">
              <h3>Sobre {pet.name}</h3>
              <p>{pet.description}</p>
            </div>

            <div className="section-block">
              <h3>Saúde e Cuidados</h3>
              <ul className="check-list">
                <li><Check size={18} color="var(--primary)" /> {pet.health}</li>
              </ul>
            </div>

            <div className="section-block">
              <h3>Temperamento</h3>
              <div className="tags-container">
                {pet.temperament && pet.temperament.map((temp, index) => (
                  <span key={index} className="tag">{temp}</span>
                ))}
              </div>
            </div>

            <div className="action-area">
              <button 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%' }}
                onClick={() => setIsModalOpen(true)}
              >
                <Heart size={20} /> Entrar com pedido de Adoção
              </button>
              <p className="action-hint">A equipe da Acapra entrará em contato em até 48 horas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeAndResetModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAndResetModal}>
              <X size={24} />
            </button>
            
            {isSuccess ? (
              <div className="success-message">
                <Heart size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
                <h3>Pedido Enviado!</h3>
                <p>Recebemos o seu formulário para adotar o(a) {pet.name}. Nossa equipe avaliará os dados e entrará em contato em breve.</p>
                <button className="btn btn-primary" onClick={closeAndResetModal}>Fechar</button>
              </div>
            ) : (
              <>
                <h2><Heart size={24} color="var(--primary)" /> Adotar {pet.name}</h2>
                <form onSubmit={handleAdoptSubmit}>
                  <div className="form-group">
                    <label>Nome Completo</label>
                    <input 
                      type="text" 
                      name="applicant_name"
                      placeholder="Ex: João da Silva" 
                      value={formData.applicant_name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Telefone (WhatsApp)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="(00) 00000-0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>E-mail</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="seuemail@exemplo.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Onde Mora (Endereço e Cidade)</label>
                    <input 
                      type="text" 
                      name="address"
                      placeholder="Ex: Rua das Flores, 123 - Centro, São Joaquim" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Por que quer adotar o(a) {pet.name}?</label>
                    <textarea 
                      name="reason"
                      placeholder="Conte para nós as suas motivações para adotar este animalzinho..."
                      rows={4}
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="modal-actions">
                    <button type="button" className="btn outline" onClick={closeAndResetModal}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
