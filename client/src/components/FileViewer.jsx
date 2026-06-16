const FileViewer = ({ material }) => {
    const renderViewer = () => {
        if (!material) {
            return (
                <div className="flex items-center justify-center w-full h-full text-on-surface-variant">
                    Loading material...
                </div>
            );
        }

        let fileType = null;
        try {
            const pathname = new URL(material).pathname;
            fileType = pathname.split('.').pop().toLowerCase();
        } catch (e) {
            // fallback if parsing fails
        }

        if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileType)) {
            return (
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img src={material} alt="Material Viewer" className="max-w-full max-h-full object-contain rounded-lg" />
                </div>
            );
        }

        if (['docx', 'doc'].includes(fileType)) {
            return (
                <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(material)}&embedded=true`}
                    className="w-full h-full border-0"
                    title="Material Viewer"
                />
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
                <div className="flex-1 w-full rounded-lg md:rounded-xl overflow-hidden border border-outline-variant bg-surface-container-highest">
                    {renderViewer()}
                </div>
            </div>

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest/90 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-outline flex items-center gap-2 md:gap-4 shadow-2xl w-max max-w-[90%] justify-between z-10">
                <button className="material-symbols-outlined p-1 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95">navigate_before</button>
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">Page 1 of 24</span>
                <button className="material-symbols-outlined p-1 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95">navigate_next</button>
            </div>
        </>
    );
};

export default FileViewer;
