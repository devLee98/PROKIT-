import { useEffect, useRef, useState } from 'react';

export function useTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current) return; // 이미 돌고 있으면 무시

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((min) => {
            if (min === 59) {
              setHours((h) => h + 1);
              return 0;
            }
            return min + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const setTime = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    hours,
    minutes,
    seconds,
    start,
    stop,
    reset,
    setTime,
  };
}
