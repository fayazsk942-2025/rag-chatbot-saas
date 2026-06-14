from sqlalchemy import text
from database import get_db

def search_similar(db, query_embedding, user_id, limit=5):

    sql = text("""
        SELECT content
        FROM document_chunks
        WHERE user_id = :user_id
        ORDER BY embedding <-> :embedding
        LIMIT :limit
    """)

    result = db.execute(sql, {
        "user_id": user_id,
        "embedding": query_embedding,
        "limit": limit
    })

    return [row[0] for row in result.fetchall()]