import React from 'react';

const QuizQuestionBlock = ({ questionData, selectedAnswer, onOptionSelect }) => {
    return (
        <>
            <section className="bg-[#1C1A22] rounded-2xl p-8 md:p-10 border border-outline-variant/50 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="space-y-3 mt-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-on-surface leading-snug tracking-wide">
                            {questionData.question}
                        </h1>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {questionData.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const optionColors = [
                        { bg: 'bg-green-500/10', border: 'border-green-500', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)]', badgeBg: 'bg-green-500', text: 'text-green-400' },
                        { bg: 'bg-blue-500/10', border: 'border-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]', badgeBg: 'bg-blue-500', text: 'text-blue-400' },
                        { bg: 'bg-pink-500/10', border: 'border-pink-500', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)]', badgeBg: 'bg-pink-500', text: 'text-pink-400' },
                        { bg: 'bg-yellow-500/10', border: 'border-yellow-500', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)]', badgeBg: 'bg-yellow-500', text: 'text-yellow-400' },
                    ];
                    const theme = optionColors[index % optionColors.length];

                    return (
                        <button
                            key={index}
                            className={`group relative flex items-center text-left p-5 rounded-2xl transition-all shadow-sm border ${isSelected
                                    ? `${theme.bg} ${theme.border} ${theme.shadow}`
                                    : 'bg-[#1C1A22] border-transparent hover:bg-surface-container-highest hover:border-outline-variant/30'
                                }`}
                            onClick={() => onOptionSelect(index)}
                        >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-colors ${isSelected
                                    ? `${theme.badgeBg} text-white`
                                    : 'bg-surface-container-highest text-on-surface-variant group-hover:text-primary'
                                }`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            <div className="ml-5">
                                <p className={`text-base font-medium ${isSelected ? theme.text : 'text-on-surface'}`}>
                                    {option}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default QuizQuestionBlock;
