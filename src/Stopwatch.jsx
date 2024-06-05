 import React, { useState, useEffect, useRef } from 'react';

 function Stopwatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTIme] = useState(0);
    const IntervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect( () => {

        if(isRunning){
            IntervalIdRef.current = setInterval( () => {
                setElapsedTIme(Date.now() - startTimeRef.current );
            }, 10)
        }

        return () => {
            clearInterval(IntervalIdRef.current);
        }

    }, [isRunning] );

    function start(){

        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){

        setIsRunning(false);
    }

    function reset(){

        setElapsedTIme(0);
        setIsRunning(false);
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10); //dividing with 10 because don't want to display all 4 digits of milliseconds. now it only displays 2 digits.

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }

    return(
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    )

 }

 export default Stopwatch;