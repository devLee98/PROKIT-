import { useEffect, useRef, useState } from 'react';
import GoalModal from '../components/modal/goal-model';
import { TimerControls } from '../components/timer/timer-controls';
import { TimerDisplay } from '../components/timer/timer-display';
import { useDeleteTimer } from '../hooks/mutation/use-delete-timer';
import { useUpdateTimer } from '../hooks/mutation/use-update-timer';
import { useGetStudyTitle } from '../hooks/query/use-get-study-title';
import { useGetTimer } from '../hooks/query/use-get-timer';
import { useTimer } from '../hooks/use-timer';
import { useTimerStore } from '../store/timer-store';

export default function IndexPage() {
  const { isRunning, setIsRunning } = useTimerStore();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [timerId, setTimerId] = useState<string | null>(null);
  const [splitTimes, setSplitTimes] = useState<
    Array<{ date: string; timeSpent: number }>
  >([]);
  const sessionStartTimeRef = useRef<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const { data: timerData, isError: isTimerError } = useGetTimer();
  const { data: studyTitleData } = useGetStudyTitle(isRunning);
  const studyTitle = studyTitleData?.data?.studyLogs?.[0]?.todayGoal;
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const { hours, minutes, seconds, start, stop, reset, setTime } = useTimer();
  const handleStart = () => {
    if (timerData) {
      sessionStartTimeRef.current = { hours, minutes, seconds };
      setIsRunning(true);
      start();
    } else {
      setIsGoalModalOpen(true);
    }
  };

  const handleStartTimer = (timerId: string) => {
    sessionStartTimeRef.current = { hours, minutes, seconds };
    setIsRunning(true);
    setIsGoalModalOpen(false);
    setTimerId(timerId);
    start();
  };

  const handlePause = () => {
    if (!sessionStartTimeRef.current) return;

    const currentTimerId = timerId || timerData?.timerId;
    if (!currentTimerId) return;

    const startTotalSeconds =
      sessionStartTimeRef.current.hours * 3600 +
      sessionStartTimeRef.current.minutes * 60 +
      sessionStartTimeRef.current.seconds;
    const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    const currentTimeSpent = (currentTotalSeconds - startTotalSeconds) * 1000;

    console.log('currentTimeSpent', currentTimeSpent);

    // 일시정지 시점의 date 생성
    const date = new Date().toISOString();

    // splitTimes 배열에 date와 timeSpent 추가
    const updatedSplitTimes = [
      ...splitTimes,
      { date, timeSpent: currentTimeSpent },
    ];

    setSplitTimes(updatedSplitTimes);

    // 서버에 일시정지 상태 업데이트
    updateTimer({
      timerId: currentTimerId,
      splitTimes: updatedSplitTimes,
    });
    sessionStartTimeRef.current = null;
    setIsRunning(false);
    stop();
  };

  const handleFinish = () => {
    setIsRunning(false);
    reset();
  };

  const handleReset = () => {
    deleteTimer(timerData.timerId);
    setSplitTimes([]);
    sessionStartTimeRef.current = null;
    setIsRunning(false);
    reset();
  };

  useEffect(() => {
    if (isTimerError) {
      setIsRunning(false);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerError]);

  useEffect(() => {
    if (isRunning) return;
    if (timerData?.splitTimes) {
      // splitTimes 상태 초기화
      setSplitTimes(timerData.splitTimes);

      // splitTimes의 합으로 총 시간 계산
      const totalTimeSpent = timerData.splitTimes.reduce(
        (acc: number, cur: { timeSpent: number }) => acc + cur.timeSpent,
        0,
      );

      // 시간, 분, 초 계산
      const calculatedHours = Math.floor(totalTimeSpent / 3600000);
      const calculatedMinutes = Math.floor((totalTimeSpent % 3600000) / 60000);
      const calculatedSeconds = Math.floor((totalTimeSpent % 60000) / 1000);

      setTime(calculatedHours, calculatedMinutes, calculatedSeconds);
    }
  }, [timerData, isRunning, setTime]);

  return (
    <div className="container mx-auto mt-24 flex min-h-screen flex-col items-center justify-center gap-20">
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onStartTimer={handleStartTimer}
      />

      <h1 className="text-center text-[72px] font-bold text-[#4c79ff]/30 select-none">
        {isRunning ? studyTitle : '오늘도 열심히 달려봐요!'}
      </h1>

      <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />

      <TimerControls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onFinish={handleFinish}
        onReset={handleReset}
      />
    </div>
  );
}
