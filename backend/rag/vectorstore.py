from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

embeddings = OpenAIEmbeddings()

def create_vectorstore(chunks):
    return FAISS.from_texts(chunks, embeddings)


def search_docs(vectorstore, query, k=3):
    return vectorstore.similarity_search(query, k=k)