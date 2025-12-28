import { useEffect, useRef, useState } from 'react';
import finish from '../assets/finish.svg';
import pause from '../assets/pause.svg';
import resetIcon from '../assets/reset.svg';
import start from '../assets/start.svg';
import timeDashboard from '../assets/time-dash.svg';
import GoalModal from '../components/modal/goal-model';
import { useDeleteTimer } from '../hooks/mutation/use-delete-timer';
import { useUpdateTimer } from '../hooks/mutation/use-update-timer';
import { useGetStudyTitle } from '../hooks/query/use-get-study-title';
import { useGetTimer } from '../hooks/query/use-get-timer';
import { useTimerStore } from '../store/timer-store';

export default function IndexPage() {
  const { isRunning, setIsRunning } = useTimerStore();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [splitTimes, setSplitTimes] = useState<
    Array<{ date: string; timeSpent: number }>
  >([]);
  const intervalRef = useRef<number | null>(null);
  const sessionStartTimeRef = useRef<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const { data: timerData, isError: isTimerError } = useGetTimer(isRunning);
  const localHours = localStorage.getItem('hours');
  const localMinutes = localStorage.getItem('minutes');
  const localSeconds = localStorage.getItem('seconds');
  const [hours, setHours] = useState(Number(localHours) || 0);
  const [minutes, setMinutes] = useState(Number(localMinutes) || 0);
  const [seconds, setSeconds] = useState(Number(localSeconds) || 0);
  const { data: studyTitleData } = useGetStudyTitle(isRunning);
  const studyTitle = studyTitleData?.data?.studyLogs?.[0]?.todayGoal;
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const handleStart = () => {
    // 조건 확인
    if (timerData) {
      sessionStartTimeRef.current = { hours, minutes, seconds };
      setIsRunning(true);
    } else {
      setIsGoalModalOpen(true);
    }
  };

  // ✅ 모달에서 시작하기를 누르면 → 모달 닫고 타이머 시작
  const handleStartTimer = () => {
    sessionStartTimeRef.current = { hours, minutes, seconds };
    setIsRunning(true);
    setIsGoalModalOpen(false);
  };

  const handlePause = () => {
    if (!sessionStartTimeRef.current) return;

    // 현재 화면 시간에서 시작 시점 화면 시간을 빼서 계산
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

    const totalTimeSpent = updatedSplitTimes.reduce(
      (acc: number, cur: { timeSpent: number }) => acc + cur.timeSpent,
      0,
    );

    localStorage.setItem(
      'hours',
      Math.floor(totalTimeSpent / 3600000).toString(),
    );
    localStorage.setItem(
      'minutes',
      Math.floor(totalTimeSpent / 60000).toString(),
    );
    localStorage.setItem(
      'seconds',
      Math.floor((totalTimeSpent % 60000) / 1000).toString(),
    );
    setSplitTimes(updatedSplitTimes);
    // 서버에 일시정지 상태 업데이트
    updateTimer({
      timerId: timerData.timerId,
      splitTimes: updatedSplitTimes,
    });
    sessionStartTimeRef.current = null;
    setIsRunning(false);
  };

  const handleFinish = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleReset = () => {
    deleteTimer(timerData.timerId);
    setSplitTimes([]);
    sessionStartTimeRef.current = null;
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (!isRunning) return;

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

    return () => clearInterval(intervalRef.current as number);
  }, [isRunning]);

  useEffect(() => {
    if (isTimerError) {
      setIsRunning(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerError]);

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="container mx-auto mt-24 flex min-h-screen flex-col items-center justify-center gap-20">
      {/* ✅ 모달에서 시작하기 누르면 handleStartTimer 호출 */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onStartTimer={handleStartTimer}
      />

      <h1 className="text-center text-[72px] font-bold text-[#4c79ff]/30 select-none">
        {isRunning ? studyTitle : '오늘도 열심히 달려봐요!'}
      </h1>

      <div className="flex items-center justify-center gap-24">
        <div className="h-[268px] w-[264px] bg-gray-200 bg-linear-to-br from-[#4c79ff]/0 to-[#4c79ff]/20 px-2 pt-2 pb-9">
          <div className="flex flex-col items-center justify-center">
            <div className="font-digital flex h-[200px] w-[250px] items-center justify-center text-[154px]">
              {formatTime(hours)}
            </div>
            <span>HOURS</span>
          </div>
        </div>

        <img src={timeDashboard} alt="time-dashboard" />

        <div className="h-[268px] w-[264px] bg-gray-200 bg-linear-to-br from-[#4c79ff]/0 to-[#4c79ff]/20 px-2 pt-2 pb-9">
          <div className="flex flex-col items-center justify-center">
            <div className="font-digital flex h-[200px] w-[250px] items-center justify-center text-[154px]">
              {formatTime(minutes)}
            </div>
            <span>MINUTES</span>
          </div>
        </div>

        <img src={timeDashboard} alt="time-dashboard" />

        <div className="h-[268px] w-[264px] bg-gray-200 bg-linear-to-br from-[#4c79ff]/0 to-[#4c79ff]/20 px-2 pt-2 pb-9">
          <div className="flex flex-col items-center justify-center">
            <div className="font-digital flex h-[200px] w-[250px] items-center justify-center text-[154px]">
              {formatTime(seconds)}
            </div>
            <span>SECONDS</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-20">
          <img
            src={start}
            width="100"
            height="100"
            onClick={isRunning ? undefined : handleStart}
            className="cursor-pointer"
            style={{ opacity: isRunning ? 0.1 : 1 }}
          />

          <img
            src={pause}
            width="100"
            height="100"
            onClick={isRunning ? handlePause : undefined}
            className="cursor-pointer"
            style={{ opacity: isRunning ? 1 : 0.1 }}
          />
          <img
            src={finish}
            width="100"
            height="100"
            onClick={isRunning ? handleFinish : undefined}
            className="cursor-pointer"
            style={{ opacity: isRunning ? 1 : 0.1 }}
          />
        </div>
        <button onClick={handleReset}>
          <img src={resetIcon} alt="reset" />
        </button>
      </div>
    </div>
  );
}
