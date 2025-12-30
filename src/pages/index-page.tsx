import { useEffect, useRef, useState } from 'react';
import { EditGoalModal } from '../components/modal/edit-goal-modal';
import GoalModal from '../components/modal/goal-model';
import { TimerControls } from '../components/timer/timer-controls';
import { TimerDisplay } from '../components/timer/timer-display';
import { useDeleteTimer } from '../hooks/mutation/use-delete-timer';
import { useUpdateTimer } from '../hooks/mutation/use-update-timer';
import { useGetStudyLogs } from '../hooks/query/use-get-study-logs';
import { useGetTimer } from '../hooks/query/use-get-timer';
import { useTimer } from '../hooks/use-timer';
import { useTimerStore } from '../store/timer-store';

export default function IndexPage() {
  const { isRunning, setIsRunning } = useTimerStore();
  //lazy initialization(먼저 localStorage에서 가져오고 없으면 false로 초기화)
  const [hasStarted, setHasStarted] = useState(() => {
    const savedHasStarted = localStorage.getItem('hasStarted');
    return savedHasStarted === 'true';
  });
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);
  const [splitTimes, setSplitTimes] = useState<
    Array<{ date: string; timeSpent: number }>
  >([]);
  const sessionStartTimeRef = useRef<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const {
    data: timerData,
    isError: isTimerError,
    isFetched,
  } = useGetTimer(hasStarted);
  const studyLogId = timerData?.studyLogId;
  const { data: studyLogsData } = useGetStudyLogs(isRunning);
  const studyTitle = studyLogsData?.data?.studyLogs?.[0]?.todayGoal;
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const { hours, minutes, seconds, start, stop, reset, setTime } = useTimer();
  const handleStart = () => {
    if (timerData) {
      sessionStartTimeRef.current = { hours, minutes, seconds };
      setIsRunning(true);
      start();
      setHasStarted(true);
    } else {
      setIsGoalModalOpen(true);
    }
  };

  const handleStartTimer = () => {
    sessionStartTimeRef.current = { hours, minutes, seconds };
    setIsRunning(true);
    setIsGoalModalOpen(false);
    // setTimerId(timerId);
    start();
    setHasStarted(true);
  };

  const handlePause = () => {
    if (!sessionStartTimeRef.current) return;

    const currentTimerId = timerData?.timerId;
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

  // 이 방법은 hasStarted가 false에서 화면이 그려진 후 useEffect가 실행되서 true로 바뀌기 때문에 깜빡임이 발생한다
  // useEffect(() => {
  //   const savedHasStarted = localStorage.getItem('hasStarted');
  //   if (savedHasStarted === 'true') {
  //     setHasStarted(true);
  //   }
  // }, []);

  // 2. hasStarted가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('hasStarted', hasStarted.toString());
  }, [hasStarted]);

  useEffect(() => {
    if (isRunning) return; // 실행 중이면 복원하지 않음

    if (!hasStarted) return;

    if (!isFetched) return;

    if (timerData?.splitTimes && timerData.splitTimes.length > 0) {
      // splitTimes 복원
      setSplitTimes(timerData.splitTimes);

      // totalTimeSpent 계산해서 시간 복원
      const totalTimeSpent = timerData.splitTimes.reduce(
        (acc: number, cur: { timeSpent: number }) => acc + cur.timeSpent,
        0,
      );

      const calculatedHours = Math.floor(totalTimeSpent / 3600000);
      const calculatedMinutes = Math.floor((totalTimeSpent % 3600000) / 60000);
      const calculatedSeconds = Math.floor((totalTimeSpent % 60000) / 1000);

      setTime(calculatedHours, calculatedMinutes, calculatedSeconds);
    } else if (!timerData) {
      // timerData가 null이면 초기화
      setTime(0, 0, 0);
      setSplitTimes([]);
      setHasStarted(false);
    }
  }, [timerData, isRunning, isFetched]);

  const handleFinish = () => {
    setIsRunning(false);
    reset();
  };

  const handleReset = () => {
    reset();
    setHasStarted(false);
    deleteTimer(timerData.timerId);
    localStorage.removeItem('hasStarted');
    setSplitTimes([]);
    sessionStartTimeRef.current = null;
    setIsRunning(false);
  };

  const handleSave = () => {};

  useEffect(() => {
    if (isTimerError) {
      setIsRunning(false);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerError]);

  return (
    <div className="container mx-auto mt-24 flex min-h-screen flex-col items-center justify-center gap-20">
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onStartTimer={handleStartTimer}
      />
      <EditGoalModal
        isOpen={isEditGoalModalOpen}
        onClose={() => setIsEditGoalModalOpen(false)}
        onSave={handleSave}
        studyLogId={studyLogId}
        isRunning={isRunning}
      />
      <h1 className="text-center text-[72px] font-bold text-[#4c79ff]/30 select-none">
        {isRunning ? studyTitle : '오늘도 열심히 달려봐요!'}
      </h1>

      <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />

      <TimerControls
        isRunning={isRunning}
        hasStarted={hasStarted}
        onStart={handleStart}
        onPause={handlePause}
        onFinish={handleFinish}
        onReset={handleReset}
        onEdit={() => setIsEditGoalModalOpen(true)}
      />
    </div>
  );
}
