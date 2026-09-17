import io
import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import logging
from typing import Dict, Any, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ocr_engine")

class DocumentOCREngine:
    """
    Dual-engine OCR & Text Extractor:
    1. Digital PDF extraction via PyMuPDF (fast, zero degradation)
    2. Optical Character Recognition via Tesseract for scanned/raster pages
    """

    def __init__(self, tesseract_cmd: str = None):
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    def extract_text_from_pdf_bytes(self, pdf_bytes: bytes) -> Dict[str, Any]:
        """
        Processes PDF byte stream and returns structured page-by-page text.
        """
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        total_pages = len(doc)
        pages_result: List[Dict[str, Any]] = []
        full_text_list: List[str] = []

        for page_idx in range(total_pages):
            page = doc[page_idx]
            page_num = page_idx + 1
            
            # 1. Attempt digital text extraction
            native_text = page.get_text("text").strip()
            
            if len(native_text) > 50:  # Page has sufficient digital text
                logger.info(f"Page {page_num}: Digital text layer extracted ({len(native_text)} chars)")
                pages_result.append({
                    "page_number": page_num,
                    "method": "digital",
                    "text": native_text
                })
                full_text_list.append(native_text)
            else:
                # 2. Fallback to OCR on rendered high-DPI pixmap
                logger.info(f"Page {page_num}: Low/no digital text. Triggering OCR rasterization...")
                pix = page.get_pixmap(dpi=300)
                img = Image.open(io.BytesIO(pix.tobytes("png")))
                
                try:
                    ocr_text = pytesseract.image_to_string(img)
                    cleaned_ocr_text = ocr_text.strip()
                    logger.info(f"Page {page_num}: OCR completed ({len(cleaned_ocr_text)} chars)")
                    pages_result.append({
                        "page_number": page_num,
                        "method": "ocr",
                        "text": cleaned_ocr_text
                    })
                    full_text_list.append(cleaned_ocr_text)
                except Exception as e:
                    logger.warning(f"Page {page_num}: OCR failed: {str(e)}")
                    pages_result.append({
                        "page_number": page_num,
                        "method": "failed",
                        "text": native_text or ""
                    })

        doc.close()
        return {
            "total_pages": total_pages,
            "pages": pages_result,
            "full_text": "\n\n".join(full_text_list)
        }
