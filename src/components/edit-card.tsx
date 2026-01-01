export default function EditCard({
  name,
  isCompleted,
  onToggle,
}: {
  name: string;
  isCompleted: boolean;
  onToggle: (isCompleted: boolean) => void;
}) {
  const handleToggle = () => {
    onToggle(!isCompleted);
  };

  return (
    <div className="flex h-[72px] items-center justify-between rounded bg-[#4c79ff] p-6 text-white">
      <span className="text-[14px]">{name}</span>
      <input
        className="size-9 border border-white"
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
    </div>
  );
}
