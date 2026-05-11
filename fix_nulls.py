import sqlite3
import os

conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'backend', 'acapra.db'))
cursor = conn.cursor()

try:
    cursor.execute("UPDATE happy_tails SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    cursor.execute("UPDATE news SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    conn.commit()
    print("Correções de DATETIME Nulos aplicadas.")
except Exception as e:
    print(e)
    
conn.close()
