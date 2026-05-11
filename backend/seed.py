import sys
import os
import shutil

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, BASE_DIR
import models
import utils

db_path = os.path.join(BASE_DIR, 'acapra.db')
if os.path.exists(db_path):
    os.remove(db_path)

models.Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # 1. Admin
    admin_hash = utils.get_password_hash("admin123")
    admin_user = models.User(username="admin", email="admin@acapra.org.br", hashed_password=admin_hash)
    db.add(admin_user)
    
    # 2. Configurações
    pix_config = models.ConfigSetting(key_name="pix_key", value="pix@acapra.org.br")
    db.add(pix_config)

    # 3. Finais Felizes
    tails = [
      models.HappyTail(title="A Jornada do Chico", description="Chico foi resgatado numa noite fria e assustado. Hoje, ele dorme na cama da tutora!", image="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600"),
      models.HappyTail(title="O Preguiçoso Garfield", description="Um gatinho laranja que adora comer. A família nunca se arrependeu.", image="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600"),
      models.HappyTail(title="Frajola Pudim", description="O cão mais bagunceiro do canil virou o guardião de um menininho.", image="https://images.unsplash.com/photo-1517423440402-f52ac3411618?w=600")
    ]
    db.add_all(tails)

    # 4. Notícias
    news = [
      models.News(title="Feira de Adoção Inverno 2026", date_str="12 de Maio", excerpt="Faremos a maior feira da Serra Catarinense.", content="Neste próximo mês, faremos a maior feira da Serra Catarinense. Estaremos recolhendo cobertores na praça matriz de São-Joaquim e doando agasalhos pet! Apareça!", image="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800", tag="Evento"),
      models.News(title="Acapra Bate Recorde Histórico", date_str="05 de Abril", excerpt="Recorde de cirurgias castrativas.", content="Nós acabamos de bater nosso recorde anual de cirurgias castrativas solidárias para os bairros do entorno.", image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800", tag="Conquista"),
      models.News(title="Novo Posto de Coleta!", date_str="18 de Fev", excerpt="Inaugurado Posto na Avenida Central.", content="Com apoio formidável, recriamos as instalações e abrimos um posto de coleta express para rações.", image="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800", tag="Novidade")
    ]
    db.add_all(news)
    
    db.commit()
    print("Semente Completa: Dinâmica Acapra Preparada.")
    db.close()

if __name__ == "__main__":
    seed()
