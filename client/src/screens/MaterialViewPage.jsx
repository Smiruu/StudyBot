import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFiles } from '../hooks/useFiles';

const MaterialViewPage = () => {
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {fetchFileById} = useFiles();
    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetchFileById(id);
                setMaterial(response.data);
            } catch (error) {
                console.error('Error fetching material:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFile();
    }, [id]);


    console.log(material)

    const navigate = useNavigate();
    const [qCount, setQCount] = useState(10);
    const [activeTab, setActiveTab] = useState('quiz');

    return (
        <section className="h-full flex flex-col space-y-6 animate-in slide-in-from-right-10 duration-500" id="split-view">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors" 
                        onClick={() => navigate('/dashboard')}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Library
                    </button>
                    <div className="h-6 w-px bg-outline-variant mx-2"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        <h2 className="font-headline-md text-on-surface">Principles of Macroeconomics.pdf</h2>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-outline hover:text-on-surface"><span className="material-symbols-outlined">zoom_in</span></button>
                    <button className="p-2 text-outline hover:text-on-surface"><span className="material-symbols-outlined">zoom_out</span></button>
                    <button className="p-2 text-outline hover:text-on-surface"><span className="material-symbols-outlined">download</span></button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden flex flex-col relative">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-6">
                        <div className="mx-auto max-w-2xl bg-white/5 p-12 rounded-sm shadow-xl min-h-[1000px] border border-white/10">
                            <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/20 pb-4">Chapter 4: Supply and Demand</h1>
                            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                                The market mechanism is the interaction of buyers and sellers to determine price and quantity of goods. Demand represents the quantity of a good that consumers are willing and able to purchase at various prices during a given period.
                            </p>
                            <div className="w-full h-48 bg-surface-container rounded-lg mb-6 flex items-center justify-center border border-dashed border-outline-variant">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-4xl text-outline mb-2">insert_chart</span>
                                    <p className="text-sm text-outline italic">Figure 4.1: The Demand Curve</p>
                                </div>
                            </div>
                            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                                The Law of Demand states that, ceteris paribus, as the price of a good falls, the quantity demanded rises. Conversely, as the price rises, the quantity demanded falls. This inverse relationship creates the downward-sloping demand curve typical of competitive markets.
                            </p>
                            <p className="text-lg text-on-surface-variant leading-relaxed">
                                Determinants of Demand include consumer income, tastes and preferences, prices of related goods (substitutes and complements), expectations, and the number of buyers. A change in any of these factors will cause a shift in the entire demand curve, rather than a movement along it.
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest/90 backdrop-blur-md px-6 py-2 rounded-full border border-outline flex items-center gap-4 shadow-2xl">
                        <button className="material-symbols-outlined">navigate_before</button>
                        <span className="text-sm font-bold">Page 1 of 24</span>
                        <button className="material-symbols-outlined">navigate_next</button>
                    </div>
                </div>

                <div className="bg-surface-container-high rounded-2xl border border-outline-variant flex flex-col overflow-hidden">

                    <div className="flex border-b border-outline-variant">
                        <button 
                            className={`flex-1 py-4 font-bold transition-all ${activeTab === 'quiz' ? 'text-primary border-b-2 border-primary' : 'text-outline hover:text-on-surface'}`}
                            onClick={() => setActiveTab('quiz')}
                        >
                            AI Quiz
                        </button>
                        <button 
                            className={`flex-1 py-4 font-bold transition-all ${activeTab === 'guide' ? 'text-primary border-b-2 border-primary' : 'text-outline hover:text-on-surface'}`}
                            onClick={() => setActiveTab('guide')}
                        >
                            Study Guide
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">

                        {activeTab === 'quiz' && (
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
                                            <div className="grid grid-cols-3 gap-3">
                                                <button className="py-2 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary/10">Undergrad</button>
                                                <button className="py-2 border-2 border-primary bg-primary/10 rounded-lg text-xs font-bold text-primary">Intermediate</button>
                                                <button className="py-2 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary/10">Expert</button>
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

                                {/* Active Quiz Area (Hidden for now, convert to JSX anyway) */}
                                <div className="hidden space-y-6" id="quiz-active">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-primary">Question 2 of 10</span>
                                            <span className="text-outline">60% Accuracy</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                            <div className="w-[20%] h-full bg-secondary transition-all duration-500"></div>
                                        </div>
                                    </div>
                                    <h4 className="font-headline-md text-on-surface text-xl">According to the Law of Demand, what happens when the price of a good increases?</h4>
                                    <div className="space-y-3">
                                        <label className="group flex items-center p-4 rounded-xl border border-outline-variant hover:border-primary bg-surface/50 cursor-pointer transition-all">
                                            <input className="w-5 h-5 text-primary bg-transparent border-outline focus:ring-0" name="q1" type="radio" />
                                            <span className="ml-4 text-on-surface group-hover:text-primary transition-colors">The quantity demanded increases proportionally.</span>
                                        </label>
                                        <label className="group flex items-center p-4 rounded-xl border border-primary bg-primary/5 cursor-pointer transition-all">
                                            <input defaultChecked className="w-5 h-5 text-primary bg-transparent border-primary focus:ring-0" name="q1" type="radio" />
                                            <span className="ml-4 text-primary font-bold">The quantity demanded decreases.</span>
                                        </label>
                                        <label className="group flex items-center p-4 rounded-xl border border-outline-variant hover:border-primary bg-surface/50 cursor-pointer transition-all">
                                            <input className="w-5 h-5 text-primary bg-transparent border-outline focus:ring-0" name="q1" type="radio" />
                                            <span className="ml-4 text-on-surface group-hover:text-primary transition-colors">The entire demand curve shifts to the right.</span>
                                        </label>
                                        <label className="group flex items-center p-4 rounded-xl border border-outline-variant hover:border-primary bg-surface/50 cursor-pointer transition-all">
                                            <input className="w-5 h-5 text-primary bg-transparent border-outline focus:ring-0" name="q1" type="radio" />
                                            <span className="ml-4 text-on-surface group-hover:text-primary transition-colors">Supply immediately increases to match.</span>
                                        </label>
                                    </div>
                                    <button 
                                        className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all" 
                                        onClick={() => alert('Answer Submitted!')}
                                    >
                                        SUBMIT MY ANSWER
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'guide' && (
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MaterialViewPage;