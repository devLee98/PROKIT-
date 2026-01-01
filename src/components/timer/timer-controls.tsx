import listIcon from '../../assets/list.svg';
import pause from '../../assets/pause.svg';
import resetIcon from '../../assets/reset.svg';
import start from '../../assets/start.svg';
import stop from '../../assets/stop.svg';

interface TimerControlsProps {
  isRunning: boolean;
  hasStarted: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onReset: () => void;
  onEdit: () => void;
}

export function TimerControls({
  isRunning,
  hasStarted,
  onStart,
  onPause,
  onStop,
  onReset,
  onEdit,
}: TimerControlsProps) {
  return (
    <div>
      <div className="flex items-center justify-center gap-20">
        <ControlButton icon={start} disabled={isRunning} onClick={onStart} />
        <ControlButton icon={pause} disabled={!isRunning} onClick={onPause} />
        <ControlButton icon={stop} disabled={!isRunning} onClick={onStop} />
      </div>
      {hasStarted && (
        <>
          <button onClick={onEdit}>
            <img src={listIcon} alt="list" />
          </button>
          <button onClick={onReset}>
            <img src={resetIcon} alt="reset" />
          </button>
        </>
      )}
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
