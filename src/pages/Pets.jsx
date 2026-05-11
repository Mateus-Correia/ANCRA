import { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import { Filter } from 'lucide-react';
import './Pets.css';

export default function Pets() {
  const [filterSpecies, setFilterSpecies] = useState('Todos');
  const [apiPets, setApiPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/pets')
      .then(res => res.json())
      .then(data => setApiPets(data))
      .catch(err => console.error("API error", err));
  }, []);

  const filteredPets = apiPets.filter(pet => {
    if (filterSpecies === 'Todos') return true;
    return pet.species === filterSpecies;
  });

  return (
    <div className="pets-page">
      <div className="pets-header-bg">
        <div className="container">
          <h1 className="heading-1">Adote um Amigo na Acapra</h1>
          <p className="pets-subtitle">Conheça nossos animais disponíveis para adoção.</p>
        </div>
      </div>

      <div className="container main-content-pets">
        <div className="filter-bar glass">
          <div className="filter-title">
            <Filter size={20} />
            <span>Filtrar por:</span>
          </div>
          <div className="filter-options">
            <button 
              className={`filter-btn ${filterSpecies === 'Todos' ? 'active' : ''}`}
              onClick={() => setFilterSpecies('Todos')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${filterSpecies === 'Cão' ? 'active' : ''}`}
              onClick={() => setFilterSpecies('Cão')}
            >
              Cães
            </button>
            <button 
              className={`filter-btn ${filterSpecies === 'Gato' ? 'active' : ''}`}
              onClick={() => setFilterSpecies('Gato')}
            >
              Gatos
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {filteredPets.length > 0 ? (
             filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))
          ) : (
            <div className="empty-state">
              <p>Nenhum animal cadastrado na API ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
