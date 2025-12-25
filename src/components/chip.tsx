import xIcon from '../assets/x.svg';

export default function Chip({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 border border-solid border-[#4c79ff] bg-[#4c79ff]/10 p-3 text-[#4c79ff]">
      <span className="text-[14px]">{name}</span>
      <button type="button" className="size-5" onClick={onRemove}>
        <img src={xIcon} alt="x" />
      </button>
    </div>
  );
}
