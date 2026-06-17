import React from 'react';

const QuizHeader = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-20 px-6 md:px-12 flex items-center justify-between z-50 bg-[#141316] border-b border-outline-variant/30">
            <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-primary tracking-tight">Studybot</span>
                <div className="h-6 w-px bg-outline-variant mx-2"></div>
                <span className="text-sm font-semibold text-on-surface-variant">Active Quiz</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-on-surface hover:bg-surface-container-high transition-all" onClick={() => window.history.back()}>
                <span className="material-symbols-outlined text-xl">close</span>
                <span className="text-sm font-bold">Exit Quiz</span>
            </button>
        </header>
    );
};

export default QuizHeader;
