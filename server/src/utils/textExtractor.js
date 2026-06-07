import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

/**
 * Converts a raw file buffer into readable text based on its MIME type.
 * @param {Buffer} buffer - The raw file buffer.
 * @param {string} mimeType - The file's MIME type.
 * @returns {Promise<string>} The extracted raw text.
 */

export const extractMaterialText = async (buffer, mimeType) => {
    switch (mimeType) {
        // PDF
        case 'application/pdf': {
            try {
                const parser = new PDFParse({ data: buffer });
                const result = await parser.getText();
                return result.text;
            } catch (error) {
                console.error("Utils Error:", error)
                throw new Error('Failed to read the text inside this PDF.');
            }
        }

        // Plain text / Markdown
        case 'text/plain':
        case 'text/markdown':
            return buffer.toString('utf-8');

        // Docx
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            try {
                const docxData = await mammoth.extractRawText({buffer: buffer});
                return docxData.value;
            } catch (error) {
                console.error('Utils error:', error)
                throw new Error('Failed to read docx format')
            }
        
        // Images (OCR)
        case 'image/png':
        case 'image/jpeg':
        case 'image/webp':
            try {
                const {data: {text}} = await Tesseract.recognize(buffer, 'eng');
                return text;
            } catch (error) {
                console.error('Utils error:', error)
                throw new Error('Failed to extract readable text from this image')
            }
        
        default:
            throw new Error(`Text extraction for ${mimeType} is not supported.`)
    }
}