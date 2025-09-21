import {useState} from 'react'

import "./css/Flashcard.css"

const Flashcard= ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    function Counter() {
        const [count, counter] = useState(0);
    }

    return (
        <div className="flashcard-container" onClick={handleFlip}>
            <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="flashcard-front">
                    <p>{question}</p>
                </div>
                <div className="flashcard-back">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
};



export default Flashcard