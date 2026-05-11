import sqlite3
import os

conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db'))
cursor = conn.cursor()

try:
    # 1. Zera Happy Tails e adiciona Exatos 3 felinos
    cursor.execute("DELETE FROM happy_tails")
    tails = [
        ("A Jornada do Chico", "Chico foi resgatado numa noite fria e muito assustado. Hoje, ele dorme na cama da sua tutora e é a atração principal das visitas! É um gatinho rajado cheio de vida.", "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600"),
        ("O Preguiçoso Garfield", "Um gatinho laranja clássico que adora comer. Sua família o adotou e não se arrependem nem um pouco: são apenas ronronados o dia todo após as tigelas ficarem vazias.", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600"),
        ("Realeza da Nina", "Nina (nossa gatinha persa) exigia muita atenção e encontrou uma tutora maravilhosa que adora mimá-la com caminhas suspensas pelo telhado de casa.", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600")
    ]
    cursor.executemany("INSERT INTO happy_tails (title, description, image) VALUES (?, ?, ?)", tails)
    
    # 2. Adiciona Noticias extra felina (se não existir, cria) 
    # Primeiro ve se a noticia ja existe
    cursor.execute("SELECT id FROM news WHERE tag = 'Notícia Felina'")
    if not cursor.fetchone():
        cursor.execute("""
            INSERT INTO news (title, excerpt, content, tag, image, date_str) 
            VALUES (
                'Nova Ala de Resgate Felino', 
                'Estamos abrindo 20 novas vagas temporárias para gatos de rua.', 
                'Devido ao alto indice de resgates, a prefeitura disponibilizou blocos para ampliar os nossos canis em gatis especializados. Toda ajuda na reforma estrutural é super contemplada!',
                'Notícia Felina',
                'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
                '22 de Maio'
            )
        """)

    # 3. Corrige a foto do bicho perdido nas denúncias (se foto vazia ou não carregar)
    # A foto do Bidu que inserimos antes pode ter corrompido, vou passar uma estática forte de um basset triste
    cursor.execute("UPDATE reports SET image = 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600' WHERE report_type = 'Perdido'")
    
    conn.commit()
    print("Atualizações Feitas: Tails Restritos, Noticia Felina Escrita, Foto Perdido Consertada.")
except Exception as e:
    print(e)
    
conn.close()
