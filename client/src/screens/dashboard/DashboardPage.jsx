import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { useFiles } from "../../hooks/useFiles";
import { getFileTypeDisplay, filterAndSortFiles } from "../../utils/dashboardUtils";

const DashboardPage = () =>{
    const { files, fetchFiles, uploadFiles, isLoading, error, page, limit, totalPages } = useFiles();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Date');
    const [stagedFiles, setStagedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const processedFiles = filterAndSortFiles(files, searchQuery, sortBy);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setStagedFiles(prev => [...prev, ...selectedFiles]);
            // Reset input so selecting the same file works again
            e.target.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setStagedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const removeStagedFile = (index) => {
        setStagedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUploadClick = async () => {
        if (stagedFiles.length === 0) return;
        const formData = new FormData();
        stagedFiles.forEach(file => {
            formData.append('files', file);
        });

        
            await uploadFiles(formData);
            setStagedFiles([]); // Clear on success
        
            // Hook sets error state
        
    };

    useEffect(() => {
        fetchFiles()
    }, [])
    
    return (
        <main className="flex-1  min-h-screen relative z-0 bg-dashboard-bg text-white font-sans p-6 md:p-12 pb-24">
            <div className="max-w-[1100px] mx-auto space-y-6">
                {/* Page Header */}
                <div className="anim-slide-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Welcome User!</h2>
                    <p className="text-base text-dashboard-text-secondary max-w-2xl">
                        Upload, organize, and manage your documents for AI analysis. Your centralized knowledge base is ready.
                    </p>
                </div>

                {/* Section A: Upload Zone */}
                <section className="space-y-4 anim-slide-up-delay-1">
                    {/* Dropzone */}
                    <input 
                        type="file" 
                        multiple 
                        ref={fileInputRef} 
                        onChange={handleFileSelect} 
                        className="hidden" 
                        accept=".pdf,.png,.jpg,.jpeg,.docx"
                    />
                    <div 
                        className="w-full bg-dashboard-card border-2 border-dashed border-dashboard-accent hover:border-yellow-400 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl relative"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-14 h-14 bg-dashboard-icon-bg rounded-xl flex items-center justify-center mb-3 shadow-lg">
                            <span className="material-symbols-outlined text-3xl text-dashboard-accent" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">Drag &amp; Drop Notes or Click to Upload</h3>
                        <p className="text-dashboard-text-secondary text-sm">Supports .PDF, .PNG, .JPG, and .DOCX (Max 10MB)</p>
                    </div>

                    {/* Staging Area (Files pending upload) */}
                    {stagedFiles.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="text-dashboard-accent text-sm font-bold tracking-widest uppercase mb-4">Ready to Upload</h4>
                            <div className="flex flex-col space-y-3">
                                {stagedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-dashboard-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <span className="material-symbols-outlined text-dashboard-cyan text-2xl">
                                                {file.type?.includes('image') ? 'image' : 'description'}
                                            </span>
                                            <span className="font-bold text-sm truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                                        </div>
                                        <button 
                                            onClick={() => removeStagedFile(index)}
                                            className="text-dashboard-text-secondary hover:text-white transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button 
                                    onClick={handleUploadClick}
                                    disabled={isLoading}
                                    className="bg-dashboard-accent text-black font-bold px-5 py-2 rounded-full flex items-center space-x-2 hover:bg-yellow-400 transition-transform hover:-translate-y-1 shadow-lg text-sm disabled:opacity-50 disabled:hover:-translate-y-0"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {isLoading ? 'hourglass_empty' : 'upload'}
                                    </span>
                                    <span>{isLoading ? 'Uploading...' : 'Upload to Studybot'}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Section B: Materials Library */}
                <section className="space-y-4 pt-4 anim-slide-up-delay-2">
                    {/* Library Header & Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold">Materials Library</h3>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full sm:w-64">
                                <input 
                                    className="w-full bg-white text-gray-800 rounded-full py-2.5 pl-5 pr-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-dashboard-accent placeholder-gray-400 font-medium text-sm" 
                                    placeholder="Search materials..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {/* Sort */}
                            <div className="relative w-full sm:w-48">
                                <select 
                                    className="w-full bg-dashboard-card text-white rounded-full py-2.5 pl-5 pr-10 font-bold appearance-none shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-dashboard-accent text-sm"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="Date">Sort by: Date</option>
                                    <option value="Name">Sort by: Name</option>
                                    <option value="Type">Sort by: Type</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-dashboard-text-secondary pointer-events-none text-xl">arrow_drop_down</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[380px] content-start transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        {error ? (
                            <p className="text-red-500 col-span-full">{error}</p>
                        ) : processedFiles && processedFiles.length > 0 ? (
                            processedFiles.map((file) => (
                                <Link 
                                    key={file.id} 
                                    to={`/dashboard/material/${file.id}`}
                                    className="bg-dashboard-card rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full shadow-lg block anim-fade-in"
                                >
                                    <div className="mb-4 flex items-center justify-center w-10 h-10 bg-dashboard-icon-bg rounded-lg">
                                        <span className="material-symbols-outlined text-dashboard-cyan text-xl">
                                            {file.file_type?.includes('image') ? 'image' : 'description'}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-dashboard-cyan text-[10px] font-bold uppercase tracking-wider block mb-1.5">
                                            {getFileTypeDisplay(file.file_type)}
                                        </span>
                                        <h4 className="text-lg font-bold line-clamp-2 leading-tight mb-4" title={file.title}>
                                            {file.title}
                                        </h4>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between text-dashboard-text-secondary text-[11px]">
                                        <span>Added {new Date(file.created_at).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))
                        ) : isLoading ? (
                            <div className="col-span-full flex justify-center items-center h-full min-h-[300px]">
                                <p className="text-dashboard-text-secondary font-bold text-base animate-pulse">Loading your materials...</p>
                            </div>
                        ) : (
                            <p className="text-dashboard-text-secondary col-span-full text-sm">No materials found matching your criteria.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-3 pt-4">
                            <button 
                                onClick={() => fetchFiles(page - 1, limit)}
                                disabled={page === 1 || isLoading}
                                className="bg-dashboard-card px-4 py-1.5 text-sm rounded-full font-bold disabled:opacity-50 hover:bg-dashboard-icon-bg transition-colors shadow-sm"
                            >
                                Previous
                            </button>
                            <span className="text-dashboard-text-secondary text-sm font-medium min-w-[80px] text-center">
                                Page {page} of {totalPages}
                            </span>
                            <button 
                                onClick={() => fetchFiles(page + 1, limit)}
                                disabled={page === totalPages || isLoading}
                                className="bg-dashboard-card px-4 py-1.5 text-sm rounded-full font-bold disabled:opacity-50 hover:bg-dashboard-icon-bg transition-colors shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default DashboardPage;