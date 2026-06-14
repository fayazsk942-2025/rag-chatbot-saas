from rag.embeddings import get_embedding
from rag.retriever import search_similar

def build_prompt(context, query):
    return f"""
You are a helpful AI assistant.

Context:
{context}

Question:
{query}

Answer clearly and accurately:
"""


def rag_pipeline(db, user_id, query, llm):
    
    # 1. embedding
    query_embedding = get_embedding(query)

    # 2. retrieve
    docs = search_similar(db, query_embedding, user_id)

    # 3. build context
    context = "\n".join(docs)

    # 4. prompt
    prompt = build_prompt(context, query)

    # 5. LLM response
    return llm(prompt) 