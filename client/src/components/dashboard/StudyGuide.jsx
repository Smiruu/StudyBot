const StudyGuide = ({ materialId }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-dashboard-card rounded-3xl border-2 border-dashed border-dashboard-icon-bg p-8 text-center" id="study-guide-content">
            <div className="w-16 h-16 bg-dashboard-icon-bg rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-4xl text-dashboard-accent" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Work in Progress</h3>
            <p className="text-dashboard-text-secondary max-w-sm mx-auto">
                The Study Guide generation feature is currently under construction. Check back soon for AI-powered summaries and study materials!
            </p>
        </div>
    );
};

export default StudyGuide;
