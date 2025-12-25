export default function Studybox({
  title,
  number,
}: {
  title: string;
  number: number;
}) {
  return (
    <div className="h-[124px] w-[240px] rounded-lg bg-white p-6">
      <p>{title}</p>
      <p>{number}</p>
    </div>
  );
}
