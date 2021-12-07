import React from 'react';
import { useState, useEffect } from 'react';
import { interval, Subject  } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import './App.css';


function App() {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [click, setClick] = useState({
    cl: 0,
    prevCl: 0,
  });

  useEffect(() => {
    const timer$ = new Subject();
    interval(1000)
      .pipe(takeUntil(timer$))
      .subscribe(() => {
        //* First method 
        // if (timerActive) {setTime(prevTime => prevTime + 1000);}
        if (timerActive) {
          setTime(prevTime => prevTime + 1);
        }
      });

    return () => {
      timer$.next();
      timer$.complete();
    };
  }, [timerActive]);

  useEffect(() => {
    if (click.cl-click.prevCl < 300) {
      setTimerActive(false);
    }
  }, [click]);


//* Timer without RxJS

  //useEffect(() => {
    //let interval = null;
    // if (timerActive) {
    //   interval = setInterval(() => {
    //     setTime(prevTime => prevTime + 1)
    //   }, 1000)
    // } else {
    //   clearInterval(interval)
    // }

    // return () => clearInterval(interval);

  //}, [ timerActive ]);


  return (
    <div className='main'>
      <div className='timersBlock'>
        <div className='clock'>
          {/* First method */}
          {/* <div>{new Date(time).toISOString().slice(11, 19)}</div> */}
          
          <span> {('0' + Math.trunc(time/3600)).slice(-2)}: </span>
          <span> {('0' + Math.trunc((time%3600)/60)).slice(-2)}: </span>
          <span> {('0'+ (time%3600)%60).slice(-2)} </span>
        </div>
        <div className='btnBlock'>
          <button 
            onClick = { () => {setTime(0); setTimerActive(!timerActive)} }>
              {timerActive ? 'Stop' : 'Start'}
          </button>
          <button 
            onClick = { (event) => { setClick((prev) => ({...click, cl: event.timeStamp, prevCl: prev.cl}));} }>
              Wait 2
          </button>
          <button onClick = { () => {setTime(0); setTimerActive(true)} }> Reset </button>
        </div>
      </div>
    </div>
  );
}

export default App;
