import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import './PetCard.css';

export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <div className="pet-img-container">
        <img src={pet.image} alt={`Foto de ${pet.name}`} className="pet-img" />
        <div className="pet-badge">{pet.species}</div>
      </div>
      
      <div className="pet-content">
        <div className="pet-header">
          <h3 className="pet-name">{pet.name}</h3>
          <span className="pet-gender">{pet.gender === 'Fêmea' ? '♀' : '♂'}</span>
        </div>
        
        <p className="pet-breed">{pet.breed}</p>
        
        <div className="pet-details-badges">
          <span className="badge">{pet.age}</span>
          <span className="badge">{pet.size}</span>
        </div>
        
        <Link to={`/pet/${pet.id}`} className="btn btn-outline btn-full">
          <Info size={18} />
          Conhecer {pet.name}
        </Link>
      </div>
    </div>
  );
}
