import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFiles } from '../../hooks/useFiles';
import FileViewer from '../../components/dashboard/FileViewer';
import AIQuiz from '../../components/dashboard/AIQuiz';
import StudyGuide from '../../components/dashboard/StudyGuide';
import {useQuiz} from '../../hooks/useQuiz';
import LoadingScreen from '../../components/ui/LoadingScreen';

const MaterialViewPage = () => {
    const [material, setMaterial] = useState(null);
    const [title, setTitle] = useState(null)
    

    const [activeTab, setActiveTab] = useState('quiz');
    const { id } = useParams();
    const { fetchFileById, isLoading: fileLoading } = useFiles();
    const { isLoading: quizLoading, generateQuiz } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFile = async () => {
            
                const response = await fetchFileById(id);
                setTitle(response.title)
                setMaterial(response.data);
            
        };
        fetchFile();
    }, [id]);

    if(fileLoading || !material){
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <LoadingScreen title="Loading Material" subtitle="Studybot is loading your material..." />
            </div>
        );
    }
    if(quizLoading){
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <LoadingScreen title="Generating Knowledge Check" subtitle="Studybot is scanning your document to create a custom quiz..." />
            </div>
        );
    }

    return (
        <section className="min-h-full lg:h-full flex flex-col space-y-4 lg:space-y-6 p-4 md:p-6 lg:p-8 animate-in slide-in-from-right-10 duration-500" id="split-view">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 anim-slide-up">
                <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                    <button
                        className="flex items-center gap-1 sm:gap-2 text-primary hover:bg-primary/10 px-2 sm:px-3 py-1.5 rounded-lg transition-colors shrink-0"
                        onClick={() => navigate('/dashboard')}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span className="hidden sm:inline font-medium">Back</span>
                    </button>
                    <div className="h-6 w-px bg-outline-variant mx-1 sm:mx-2 shrink-0"></div>
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-primary shrink-0">description</span>
                        <h2 className="font-headline-md text-on-surface truncate text-lg sm:text-xl md:text-2xl">{title}</h2>
                    </div>
                </div>

            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0 pb-6 lg:pb-0">

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden flex flex-col relative anim-slide-up-delay-1">
                    <FileViewer material={material} />
                </div>

                <div className="bg-surface-container-high rounded-2xl border border-outline-variant flex flex-col overflow-hidden h-full anim-slide-up-delay-2">
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
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 anim-fade-in" key={activeTab}>
                        {activeTab === 'quiz' && <AIQuiz materialId={id} generateQuiz={generateQuiz} />}
                        {activeTab === 'guide' && <StudyGuide materialId={id} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MaterialViewPage;