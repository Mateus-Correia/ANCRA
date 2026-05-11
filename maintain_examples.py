import sqlite3
import os

# Caminho para o banco real no backend
db_path = os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # 1. Garantir Exemplos de Pets (Pelo menos 3 para a grade 3 por linha)
    cursor.execute("SELECT count(*) FROM pets")
    if cursor.fetchone()[0] < 3:
        cursor.execute("DELETE FROM pets")
        pets = [
            ("Bidu", "Cão", "Vira-lata", "2 anos", "Médio", "Macho", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600", "Bidu é super alegre e foi resgatado com a patinha machucada, mas já está 100%.", "Vacinado e Castrado", "Brincalhão, Dócil"),
            ("Mel", "Cão", "Labrador Mix", "1 ano", "Grande", "Fêmea", "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600", "Mel é protetora e adora deitar no sol em tapetes macios.", "Saudável e Vacinada", "Protetora, Calma"),
            ("Simba", "Gato", "SRD Laranja", "6 meses", "Pequeno", "Macho", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600", "Simba é um filhotão que adora pular e escalar os móveis. Gosta de sachê.", "FIV/FELV negativo", "Aventureiro, Curioso")
        ]
        cursor.executemany("INSERT INTO pets (name, species, breed, age, size, gender, image, description, health, temperament) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", pets)
        print("Exemplos de Pets inseridos.")

    # 2. Garantir Exemplos de Denuncias / Perdidos (Exatamente 2: um e um)
    cursor.execute("SELECT count(*) FROM reports")
    if cursor.fetchone()[0] < 2:
        cursor.execute("DELETE FROM reports")
        reports = [
            ("Perdido", "Procura-se Toby - Yorkshire Cinza", "Visto pela última vez perto da padaria central. Usa coleira azul e tem muito medo de fogos.", "(49) 9988-1234", "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"),
            ("Denúncia", "Cão Acabrestado em sacada (Maus Tratos)", "Vizinhos deixam o cachorro sem água na varanda por dias seguidos no bairro Bela Vista.", "Anonimo", "https://images.unsplash.com/photo-1522276498395-f4f68f714653?w=600")
        ]
        cursor.executemany("INSERT INTO reports (report_type, title, description, contact, image, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)", reports)
        print("Exemplos de Denúncias/Perdidos inseridos.")

    # 3. Garantir Exemplos de Historias Felinas (Exatamente 3 para preencher a home)
    cursor.execute("SELECT count(*) FROM happy_tails")
    if cursor.fetchone()[0] < 3:
        cursor.execute("DELETE FROM happy_tails")
        tails = [
            ("A Jornada do Chico", "Chico foi resgatado numa noite fria e muito assustado. Hoje, ele dorme na cama da sua tutora e é a atração principal das visitas! É um gatinho rajado cheio de vida.", "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600"),
            ("O Preguiçoso Garfield", "Um gatinho laranja clássico que adora comer. Sua família o adotou e não se arrependem nem um pouco: são apenas ronronados o dia todo.,", "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600"),
            ("Realeza da Nina", "Nina (nossa gatinha persa) exigia muita atenção e encontrou uma tutora maravilhosa que adora mimá-la com caminhas suspensas.", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600")
        ]
        cursor.executemany("INSERT INTO happy_tails (title, description, image, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)", tails)
        print("Exemplos felinos de histórias felizes inseridos.")

    # 4. Garantir Noticias no Carrossel (Pelo menos 4: 1 Felina, 1 Feirinha, 1 Voluntários, 1 Geral)
    cursor.execute("SELECT count(*) FROM news")
    if cursor.fetchone()[0] < 4:
        cursor.execute("DELETE FROM news")
        news = [
            ('Nova Ala de Resgate Felino', 'Estamos abrindo 20 novas vagas temporárias para gatos de rua.', 'Devido ao alto indice de resgates, a prefeitura disponibilizou blocos para ampliar nossos canis em gatis especializados. Abrace a causa!', 'Notícia Felina', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600', '22 Maio'),
            ('Mega Feirão de Adoção de Inverno', 'Agasalhos, café quente e muitos focinhos precisando de um lar.', 'Neste final de semana, a praça Cesário Amarante estará repleta de cães e gatos. Leve seu comprovante de residência e RG.', 'Evento Oficial', 'https://images.unsplash.com/photo-1601758174114-e711c0cbea69?w=600', '15 Junho'),
            ('Workshop de Conscientização', 'Veterinários darão palestras grátis em escolas locais.', 'Ensinar as crianças a proteger a fauna é nossa missão. As palestras são lúdicas sobre castração e abandono.', 'Educação', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600', '02 Julho'),
            ('Ação de Força Tarefa Bem-Estar', 'Mutirão para banho e tosa nos animais do abrigo temporário.', 'Venha ser voluntário neste sábado, trazer seu shampoo pet e nos ajudar na higienização.', 'Voluntariado', 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600', '10 Agosto')
        ]
        cursor.executemany("INSERT INTO news (title, excerpt, content, tag, image, date_str, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)", news)
        print("Exemplos de Notícias (incluindo felinas) inseridos no carrossel.")

    conn.commit()
    print("Sucesso: Todos os componentes estão devidamente exemplificados para demonstração estrutural.")
except Exception as e:
    print(f"Erro ao manter os dados: {e}")
finally:
    conn.close()
