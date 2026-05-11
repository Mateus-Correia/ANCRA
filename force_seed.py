import urllib.request
import json

def post_data(url, data):
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req)
        print(f"Sucesso ao injetar requisição em {url}")
    except Exception as e:
        print(f"Falha na injeção {url}: {e}")

# Pets
pets = [
    {"name": "Rex", "species": "Cão", "breed": "Vira-Lata", "age": "2 anos", "size": "Médio", "gender": "Macho", "image": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600", "description": "Muito dócil e amigável.", "health": "Vacinado e Castrado", "temperament": ["Brincalhão"]},
    {"name": "Mia", "species": "Gato", "breed": "Siamês", "age": "1 ano", "size": "Pequeno", "gender": "Fêmea", "image": "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600", "description": "Gosta de dormir no sol.", "health": "Vacinada", "temperament": ["Calma"]}
]
for p in pets: post_data("http://localhost:8000/api/pets", p)

# Notícias
news = [
    {"title": "Feira de Adoção Inverno 2026", "date_str": "12 de Maio", "excerpt": "Faremos a maior feira da Serra Catarinense.", "content": "Neste próximo mês, estaremos recolhendo cobertores na praça matriz de São-Joaquim e doando agasalhos pet! Apareça!", "image": "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800", "tag": "Evento"},
    {"title": "Acapra Bate Recorde", "date_str": "05 de Abril", "excerpt": "Recorde de cirurgias castrativas solidárias.", "content": "Nós acabamos de bater nosso recorde anual de cirurgias.", "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800", "tag": "Conquista"}
]
for n in news: post_data("http://localhost:8000/api/news", n)

# Happy Tails
tails = [
    {"title": "A Jornada do Chico", "description": "Chico foi resgatado numa noite fria e assustado. Hoje, ele dorme na cama da tutora!", "image": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600"},
    {"title": "Princesa Salva", "description": "Resgatada com a patinha quebrada, encontrou um lar espetacular.", "image": "https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=600"}
]
for t in tails: post_data("http://localhost:8000/api/happytails", t)

# Denúncias
reports = [
    {"report_type": "Perdido", "title": "Basset Hound Sumido", "description": "Meu cão salsicha chamado Bidu sumiu no centro.", "contact": "49 99999-1111", "image": "https://images.unsplash.com/photo-1615672967664-9fc230302fb0?w=600"},
    {"report_type": "Denúncia", "title": "Cão acorrentado sem água", "description": "Na rua xv de novembro, uma casa abandonada com cachorro amarrado latindo muito sem pote de água visível há dias.", "contact": "Anônimo", "image": ""}
]
for r in reports: post_data("http://localhost:8000/api/reports", r)
