import timeDashboard from '../../assets/time-dash.svg';
import { TimeUnit } from './time-unit.tsx';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}

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
