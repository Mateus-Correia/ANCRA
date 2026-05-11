import sqlite3
import os
import urllib.request
import json

# 1. Alterar Banco
conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db'))
cursor = conn.cursor()
try:
    cursor.execute("ALTER TABLE reports ADD COLUMN image VARCHAR;")
    conn.commit()
    print("Coluna image inserida")
except Exception as e:
    print("Erro (já existe?):", e)
conn.close()

# 2. Injetar Reports novamente
def post_data(url, data):
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req)
        print(f"Sucesso injeção em {url}")
    except Exception as e:
         print(f"Falha na injeção {url}: {e}")

reports = [
    {"report_type": "Perdido", "title": "Basset Hound Sumido", "description": "Meu cão salsicha chamado Bidu sumiu no centro.", "contact": "49 99999-1111", "image": "https://images.unsplash.com/photo-1615672967664-9fc230302fb0?w=600"},
    {"report_type": "Denúncia", "title": "Cão acorrentado sem água", "description": "Na rua xv de novembro, uma casa abandonada com cachorro amarrado latindo muito sem pote de água visível há dias.", "contact": "Anônimo", "image": ""}
]
for r in reports: post_data("http://localhost:8000/api/reports", r)
