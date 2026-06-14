from fastapi import APIRouter, UploadFile, File
import os
from rag.loader import load_pdf_text
from rag.chunker import chunk_text
from rag.vectorstore import create_vectorstore
from rag.embeddings import get_embedding
from models.document import DocumentChunk

router = APIRouter(prefix="/upload", tags=["Upload"])

VECTOR_DB = {}  # temp storage (later DB)

@router.post("/")
async def upload_file(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # 1. extract text
    text = load_pdf_text(file_path)

    # 2. chunk
    chunks = chunk_text(text)

    # 3. vector store
    vectorstore = create_vectorstore(chunks)

    # store in memory (later DB per user)
    VECTOR_DB[file.filename] = vectorstore

    os.remove(file_path)

    return {"message": "File uploaded and processed"}