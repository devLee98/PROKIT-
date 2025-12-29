const formatTime = (time: number) => String(time).padStart(2, '0');

interface TimeUnitProps {
  value: number;
  label: string;
}

export function TimeUnit({ value, label }: TimeUnitProps) {
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
