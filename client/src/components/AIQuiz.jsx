import { useState } from 'react';

const AIQuiz = ({ materialId }) => {
    const [qCount, setQCount] = useState(10);

    return (
        <div className="space-y-6" id="ai-quiz-content">
            <div className="space-y-8 py-4" id="quiz-setup">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-primary">quiz</span>
                    </div>
                    <h3 className="font-headline-md text-on-surface">Generate Knowledge Check</h3>
                    <p className="text-secondary">Studybot will scan your document to create a custom quiz.</p>
                </div>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-bold text-on-surface">Question Count: <span className="text-tertiary" id="q-count-val">{qCount}</span></span>
                        <input 
                            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-tertiary mt-4" 
                            max="20" 
                            min="5" 
                            type="range" 
                            value={qCount}
                            onChange={(e) => setQCount(e.target.value)}
                        />
                        <div className="flex justify-between text-[10px] text-outline mt-1 font-bold">
                            <span>5</span>
                            <span>10</span>
                            <span>15</span>
                            <span>20</span>
                        </div>
                    </label>
                    <div className="space-y-3">
                        <span className="text-sm font-bold text-on-surface">Complexity Level</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            <button className="py-2.5 sm:py-2 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors">Easy</button>
                            <button className="py-2.5 sm:py-2 border-2 border-primary bg-primary/10 rounded-lg text-xs font-bold text-primary transition-colors">Intermediate</button>
                            <button className="py-2.5 sm:py-2 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors">Expert</button>
                        </div>
                    </div>
                </div>
                <button 
                    className="w-full py-4 bg-tertiary text-on-tertiary rounded-xl font-display-lg text-[18px] font-extrabold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-tertiary/10" 
                    onClick={() => {}}
                >
                    GENERATE MY QUIZ
                </button>
            </div>

           </div>
    );
};

export default AIQuiz;
