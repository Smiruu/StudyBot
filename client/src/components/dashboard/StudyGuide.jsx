const StudyGuide = ({ materialId }) => {
    return (
        <div className="space-y-6 prose prose-invert max-w-none" id="study-guide-content">
            <div className="bg-surface-container-highest p-6 rounded-2xl border border-outline-variant">
                <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    AI Summary: Supply &amp; Demand
                </h3>
                <ul className="space-y-4 text-on-surface list-none p-0">
                    <li className="flex gap-3">
                        <span className="text-tertiary font-bold mt-1">●</span>
                        <span><strong>Market Interaction:</strong> The core of macroeconomics relies on the equilibrium between buyer desire (demand) and seller production (supply).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-tertiary font-bold mt-1">●</span>
                        <span><strong>The Law of Demand:</strong> An inverse correlation—as price goes up, consumers buy less. Crucial for pricing strategy.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-tertiary font-bold mt-1">●</span>
                        <span><strong>Shifts vs. Movement:</strong> A change in price causes movement <em>along</em> the curve. A change in external factors (like income) causes a <em>shift</em> of the entire curve.</span>
                    </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-outline-variant">
                    <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-4">Key Vocabulary</h4>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-surface rounded-full border border-outline-variant text-sm">Ceteris Paribus</span>
                        <span className="px-3 py-1 bg-surface rounded-full border border-outline-variant text-sm">Equilibrium</span>
                        <span className="px-3 py-1 bg-surface rounded-full border border-outline-variant text-sm">Substitute Goods</span>
                        <span className="px-3 py-1 bg-surface rounded-full border border-outline-variant text-sm">Quantity Demanded</span>
                    </div>
                </div>
            </div>
            <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/20">
                <h4 className="text-secondary font-bold mb-2">Practice Prompt</h4>
                <p className="text-sm italic">"Describe a real-world scenario where a shift in consumer taste caused a significant rightward shift in the demand curve for a product of your choice."</p>
            </div>
        </div>
    );
};

export default StudyGuide;
