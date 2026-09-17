import re
from typing import List, Dict, Any

class DocumentChunker:
    """
    Splits extracted document text into semantic sliding-window chunks with metadata.
    """

    def __init__(self, target_chunk_size: int = 500, overlap_size: int = 60):
        self.target_chunk_size = target_chunk_size
        self.overlap_size = overlap_size

    def clean_text(self, text: str) -> str:
        # Normalize whitespace and excessive newlines
        text = re.sub(r'\r\n', '\n', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        text = re.sub(r'[ \t]{2,}', ' ', text)
        return text.strip()

    def chunk_document_pages(self, pages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        chunks: List[Dict[str, Any]] = []
        chunk_index = 0

        for page in pages:
            raw_text = page.get("text", "")
            page_num = page.get("page_number", 1)
            cleaned = self.clean_text(raw_text)

            if not cleaned:
                continue

            words = cleaned.split()
            if len(words) <= self.target_chunk_size:
                chunks.append({
                    "chunk_index": chunk_index,
                    "page_number": page_num,
                    "content": cleaned,
                    "token_count": len(words)
                })
                chunk_index += 1
            else:
                start = 0
                while start < len(words):
                    end = min(start + self.target_chunk_size, len(words))
                    chunk_words = words[start:end]
                    chunk_text = " ".join(chunk_words)

                    chunks.append({
                        "chunk_index": chunk_index,
                        "page_number": page_num,
                        "content": chunk_text,
                        "token_count": len(chunk_words)
                    })
                    chunk_index += 1

                    if end == len(words):
                        break
                    start += (self.target_chunk_size - self.overlap_size)

        return chunks
