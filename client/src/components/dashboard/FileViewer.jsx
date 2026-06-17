import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import mammoth from 'mammoth';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const FileViewer = ({ material }) => {
    const [docHtml, setDocHtml] = useState(null);
    const [isLoadingDoc, setIsLoadingDoc] = useState(false);
    const [docError, setDocError] = useState(null);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(null);

    const fileType = useMemo(() => {
        if (!material) return null;
        try {
            const pathname = new URL(material, window.location.origin).pathname;
            return pathname.split('.').pop().toLowerCase();
        } catch (e) {
            return null;
        }
    }, [material]);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                setContainerWidth(entries[0].contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (material && ['docx', 'doc'].includes(fileType)) {
            setIsLoadingDoc(true);
            setDocError(null);
            fetch(material)
                .then(res => res.arrayBuffer())
                .then(buffer => mammoth.convertToHtml({ arrayBuffer: buffer }))
                .then(result => {
                    setDocHtml(result.value);
                })
                .catch(() => {
                    setDocError("Failed to load document.");
                })
                .finally(() => {
                    setIsLoadingDoc(false);
                });
        }
    }, [material, fileType]);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    }, []);

    const previousPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
    const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

    const isPdf = fileType === 'pdf';

    const renderViewer = () => {
        if (!material) {
            return (
                <div className="flex items-center justify-center w-full h-full text-on-surface-variant">
                    Loading material...
                </div>
            );
        }

        if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileType)) {
            return (
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img src={material} alt="Material Viewer" className="max-w-full max-h-full object-contain rounded-lg" />
                </div>
            );
        }

        if (['docx', 'doc'].includes(fileType)) {
            if (isLoadingDoc) {
                return <div className="flex items-center justify-center w-full h-full">Loading document...</div>;
            }
            if (docError) {
                return <div className="flex items-center justify-center w-full h-full text-error">{docError}</div>;
            }
            return (
                <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 bg-white docx-content">
                    <div dangerouslySetInnerHTML={{ __html: docHtml }} className="max-w-4xl mx-auto text-black" />
                </div>
            );
        }

        if (isPdf) {
            return (
                <div className="w-full h-full flex flex-col items-center overflow-y-auto custom-scrollbar bg-surface-container-lowest py-4 overflow-x-hidden" ref={containerRef}>
                    <Document
                        file={material}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<div className="flex items-center justify-center w-full h-full">Loading PDF...</div>}
                        error={<div className="flex items-center justify-center w-full h-full text-error">Failed to load PDF.</div>}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-xl"
                            width={containerWidth ? Math.min(containerWidth - 32, 1200) : undefined}
                        />
                    </Document>
                </div>
            );
        }

        return (
            <iframe
                src={material}
                className="w-full h-full border-0"
                title="Material Viewer"
            />
        );
    };

    return (
        <>
            <div className="flex-1 w-full h-full min-h-[60vh] md:min-h-0 flex flex-col p-2 md:p-6">
                <div className="flex-1 w-full rounded-lg md:rounded-xl overflow-hidden border border-outline-variant bg-surface-container-highest relative">
                    {renderViewer()}
                </div>
            </div>

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest/90 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-outline flex items-center gap-2 md:gap-4 shadow-2xl w-max max-w-[90%] justify-between z-10">
                <button
                    onClick={previousPage}
                    disabled={!isPdf || pageNumber <= 1}
                    className="material-symbols-outlined p-1 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    navigate_before
                </button>
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                    Page {isPdf ? pageNumber : 1} of {isPdf && numPages ? numPages : 1}
                </span>
                <button
                    onClick={nextPage}
                    disabled={!isPdf || !numPages || pageNumber >= numPages}
                    className="material-symbols-outlined p-1 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    navigate_next
                </button>
            </div>
        </>
    );
};

export default FileViewer;
