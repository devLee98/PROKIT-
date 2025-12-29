import timeDashboard from '../../assets/time-dash.svg';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const formatTime = (time: number) => String(time).padStart(2, '0');

export function TimerDisplay({ hours, minutes, seconds }: TimerDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-24">
      <TimeUnit value={hours} label="HOURS" />
      <img src={timeDashboard} alt="time-dashboard" />
      <TimeUnit value={minutes} label="MINUTES" />
      <img src={timeDashboard} alt="time-dashboard" />
      <TimeUnit value={seconds} label="SECONDS" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="h-[268px] w-[264px] bg-gray-200 bg-linear-to-br from-[#4c79ff]/0 to-[#4c79ff]/20 px-2 pt-2 pb-9">
      <div className="flex flex-col items-center justify-center">
        <div className="font-digital flex h-[200px] w-[250px] items-center justify-center text-[154px]">
          {formatTime(value)}
        </div>
        <span>{label}</span>
      </div>
    </div>
  );
}
