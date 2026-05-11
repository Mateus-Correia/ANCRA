import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE users ADD COLUMN full_name TEXT DEFAULT ''")
    cursor.execute("ALTER TABLE users ADD COLUMN age TEXT DEFAULT ''")
    cursor.execute("ALTER TABLE users ADD COLUMN location TEXT DEFAULT 'São Joaquim, SC'")
    cursor.execute("ALTER TABLE users ADD COLUMN avatar_url TEXT DEFAULT ''")
    cursor.execute("ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0")
    
    # Antigos usuários admin viram admins
    cursor.execute("UPDATE users SET is_admin = 1")
    
    conn.commit()
    print("MIGRAÇÃO DE BANCO: Adicionado perfis de usuários com sucesso.")
except Exception as e:
    print(f"Migração ignorada ou com erro: {e}")
    conn.rollback()

conn.close()
