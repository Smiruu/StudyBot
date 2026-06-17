import { useState, useEffect } from 'react';

export const useCountdown = (initialSeconds) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds || 0);

    useEffect(() => {
        setTimeLeft(initialSeconds || 0);
    }, [initialSeconds]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return { timeLeft, formattedTime, isTimeUp: timeLeft === 0 && (initialSeconds > 0) };
};

export const useTimer = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return { timeElapsed, formattedTime };
};