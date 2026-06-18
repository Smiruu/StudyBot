const AnalyticsPage = () => {
    return (
        <main className="flex-1 min-h-[calc(100vh-80px)] md:min-h-screen bg-dashboard-bg text-white font-sans p-6 md:p-12 pb-24">
            <div className="max-w-[1100px] mx-auto anim-slide-up">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Analytics</h1>
                    <p className="text-dashboard-text-secondary">Track your study progress and performance.</p>
                </div>
                
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-dashboard-card rounded-3xl border-2 border-dashed border-dashboard-icon-bg p-8 text-center shadow-xl">
                    <div className="w-20 h-20 bg-dashboard-icon-bg rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                        <span className="material-symbols-outlined text-5xl text-dashboard-cyan" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3">Work in Progress</h3>
                    <p className="text-dashboard-text-secondary max-w-md mx-auto text-lg">
                        The Analytics dashboard is currently under construction. Soon you'll be able to see detailed insights about your quizzes, study time, and more!
                    </p>
                </div>
            </div>
        </main>
    );
};

export default AnalyticsPage;
