from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import uvicorn
from ocr_engine import DocumentOCREngine
from chunker import DocumentChunker

app = FastAPI(
    title="AI Competency Adaptive Learning - Document OCR & Chunking Service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ocr_engine = DocumentOCREngine()
chunker = DocumentChunker(target_chunk_size=400, overlap_size=50)

@app.get("/health")
def health():
    return {"status": "healthy", "service": "ocr-document-processor"}

@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        contents = await file.read()
        extracted = ocr_engine.extract_text_from_pdf_bytes(contents)
        chunks = chunker.chunk_document_pages(extracted["pages"])

        return {
            "filename": file.filename,
            "total_pages": extracted["total_pages"],
            "full_text_sample": extracted["full_text"][:500],
            "total_chunks": len(chunks),
            "chunks": chunks
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
