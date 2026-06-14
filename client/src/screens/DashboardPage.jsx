const DashboardPage = () => {
    return (
        <main className="flex-1  min-h-screen relative z-0 bg-dashboard-bg text-white font-sans p-6 md:p-12 pb-24">
            {/* Mobile TopAppBar would go here if needed, but per the image we focus on main content */}

            <div className="max-w-[1100px] mx-auto space-y-12">
                {/* Page Header */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Welcome User!</h2>
                    <p className="text-lg text-dashboard-text-secondary max-w-2xl">
                        Upload, organize, and manage your documents for AI analysis. Your centralized knowledge base is ready.
                    </p>
                </div>

                {/* Section A: Upload Zone */}
                <section className="space-y-6">
                    {/* Dropzone */}
                    <div className="w-full bg-dashboard-card border-2 border-dashed border-dashboard-accent hover:border-yellow-400 transition-colors rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl">
                        <div className="w-20 h-20 bg-dashboard-icon-bg rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <span className="material-symbols-outlined text-[40px] text-dashboard-accent" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Drag &amp; Drop Notes or Click to Upload</h3>
                        <p className="text-dashboard-text-secondary">Supports .PDF, .PNG, .JPG, and .DOCX (Max 10MB)</p>
                    </div>

                    {/* Staging Area (Files pending upload) */}
                    <div className="space-y-4">
                        <h4 className="text-dashboard-accent text-sm font-bold tracking-widest uppercase mb-4">Ready to Upload</h4>
                        <div className="flex flex-col space-y-3">
                            {/* Staged File 1 */}
                            <div className="flex items-center justify-between bg-dashboard-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <span className="material-symbols-outlined text-dashboard-cyan text-2xl">description</span>
                                    <span className="font-bold text-sm">Chemistry_Notes_Ch1-3.pdf</span>
                                </div>
                                <button className="text-dashboard-text-secondary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>

                            {/* Staged File 2 */}
                            <div className="flex items-center justify-between bg-dashboard-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <span className="material-symbols-outlined text-dashboard-cyan text-2xl">image</span>
                                    <span className="font-bold text-sm">Lecture_Slide_Biology_1.jpg</span>
                                </div>
                                <button className="text-dashboard-text-secondary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button className="bg-dashboard-accent text-black font-bold px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-yellow-400 transition-transform hover:-translate-y-1 shadow-lg">
                                <span className="material-symbols-outlined text-[20px]">upload</span>
                                <span>Upload to Studybot</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section B: Materials Library */}
                <section className="space-y-8 pt-8">
                    {/* Library Header & Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h3 className="text-3xl font-bold">Materials Library</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full sm:w-72">
                                <input className="w-full bg-white text-gray-800 rounded-full py-3.5 pl-6 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-dashboard-accent placeholder-gray-400 font-medium" placeholder="Search materials..." type="text" />
                            </div>
                            {/* Sort */}
                            <div className="relative w-full sm:w-56">
                                <select className="w-full bg-dashboard-card text-white rounded-full py-3.5 pl-6 pr-12 font-bold appearance-none shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-dashboard-accent">
                                    <option>Sort by: Date</option>
                                    <option>Sort by: Name</option>
                                    <option>Sort by: Type</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-dashboard-text-secondary pointer-events-none">arrow_drop_down</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-dashboard-card rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full shadow-lg">
                            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-dashboard-icon-bg rounded-xl">
                                <span className="material-symbols-outlined text-dashboard-cyan text-2xl">description</span>
                            </div>
                            <div className="flex-1">
                                <span className="text-dashboard-cyan text-xs font-bold uppercase tracking-wider block mb-2">PDF DOCUMENT</span>
                                <h4 className="text-xl font-bold line-clamp-2 leading-tight mb-8">Advanced Calculus Final Review Notes</h4>
                            </div>
                            <div className="mt-auto flex items-center justify-between text-dashboard-text-secondary text-xs">
                                <span>Added Oct 12, 2023</span>
                                <span className="font-bold">2.4 MB</span>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-dashboard-card rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full shadow-lg">
                            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-dashboard-icon-bg rounded-xl">
                                <span className="material-symbols-outlined text-dashboard-cyan text-2xl">description</span>
                            </div>
                            <div className="flex-1">
                                <span className="text-dashboard-cyan text-xs font-bold uppercase tracking-wider block mb-2">DOCX DOCUMENT</span>
                                <h4 className="text-xl font-bold line-clamp-2 leading-tight mb-8">History Midterm Essay Draft v2</h4>
                            </div>
                            <div className="mt-auto flex items-center justify-between text-dashboard-text-secondary text-xs">
                                <span>Added Oct 10, 2023</span>
                                <span className="font-bold">845 KB</span>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-dashboard-card rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full shadow-lg">
                            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-dashboard-icon-bg rounded-xl">
                                <span className="material-symbols-outlined text-dashboard-cyan text-2xl">image</span>
                            </div>
                            <div className="flex-1">
                                <span className="text-dashboard-cyan text-xs font-bold uppercase tracking-wider block mb-2">PNG IMAGE</span>
                                <h4 className="text-xl font-bold line-clamp-2 leading-tight mb-8">Cell Structure Diagram (Annotated)</h4>
                            </div>
                            <div className="mt-auto flex items-center justify-between text-dashboard-text-secondary text-xs">
                                <span>Added Oct 08, 2023</span>
                                <span className="font-bold">1.2 MB</span>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-dashboard-card rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full shadow-lg">
                            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-dashboard-icon-bg rounded-xl">
                                <span className="material-symbols-outlined text-dashboard-cyan text-2xl">description</span>
                            </div>
                            <div className="flex-1">
                                <span className="text-dashboard-cyan text-xs font-bold uppercase tracking-wider block mb-2">PDF DOCUMENT</span>
                                <h4 className="text-xl font-bold line-clamp-2 leading-tight mb-8">Syllabus - Intro to Computer Science 101</h4>
                            </div>
                            <div className="mt-auto flex items-center justify-between text-dashboard-text-secondary text-xs">
                                <span>Added Sep 01, 2023</span>
                                <span className="font-bold">450 KB</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default DashboardPage;