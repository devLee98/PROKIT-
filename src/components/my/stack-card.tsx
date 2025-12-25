export default function StackCard({ tech }: { tech: string }) {
  return (
    <div
      className="flex h-[28px] items-center justify-center rounded bg-[#f0f2f5] px-2 py-1 text-center"
      key={tech}
    >
      {tech}
    </div>
  );
}
