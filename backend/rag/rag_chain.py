from rag.vectorstore import search_docs

def rag_answer(vectorstore, query, llm_call):

    docs = search_docs(vectorstore, query)

    context = "\n".join([doc.page_content for doc in docs])

    prompt = f"""
    You are an AI assistant. Use the context below to answer.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """

    response = llm_call(prompt)

    return response