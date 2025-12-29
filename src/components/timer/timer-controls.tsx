import finish from '../../assets/finish.svg';
import pause from '../../assets/pause.svg';
import resetIcon from '../../assets/reset.svg';
import start from '../../assets/start.svg';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onFinish: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onFinish,
  onReset,
}: TimerControlsProps) {
  return (
    <div>
      <div className="flex items-center justify-center gap-20">
        <ControlButton icon={start} disabled={isRunning} onClick={onStart} />
        <ControlButton icon={pause} disabled={!isRunning} onClick={onPause} />
        <ControlButton icon={finish} disabled={!isRunning} onClick={onFinish} />
      </div>
      <button onClick={onReset}>
        <img src={resetIcon} alt="reset" />
      </button>
    </div>
  );
}

function ControlButton({
  icon,
  disabled,
  onClick,
}: {
  icon: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <img
      src={icon}
      width="100"
      height="100"
      onClick={disabled ? undefined : onClick}
      className="cursor-pointer"
      style={{ opacity: disabled ? 0.1 : 1 }}
    />
  );
}
