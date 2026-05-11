import sqlite3
import os

conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db'))
cursor = conn.cursor()

try:
    # Corrige a foto do bicho com defeito chamado algo como Cafe
    cursor.execute("UPDATE pets SET image = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600' WHERE name LIKE '%café%' OR name LIKE '%cafe%' AND image LIKE '%broken%'")
    
    # Adicionar +1 historia felina para caber exato 3
    cursor.execute("SELECT COUNT(*) FROM happy_tails")
    count = cursor.fetchone()[0]
    if count < 3:
        cursor.execute("INSERT INTO happy_tails (title, description, image) VALUES (?, ?, ?)", ("O Rei Leão", "Salvo em uma valeta, agora vive cercado por almofadas e sachês finos com seus avós adotivos.", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600"))
        
    conn.commit()
    print("Correções feitas via banco.")
except Exception as e:
    print(e)
    
conn.close()
