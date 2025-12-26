import { useState } from 'react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTimer: () => void; // ← 단순히 "시작했다"는 신호만
}

export default function GoalModal({
  isOpen,
  onClose,
  onStartTimer,
}: GoalModalProps) {
  const [goals, setGoals] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddGoal = () => {
    if (inputValue.trim()) {
      setGoals([...goals, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  // ✅ 모달에서 시작하기 버튼 클릭 → 바로 시작!
  const handleStart = () => {
    // 모달에서 타이머 시작 로직 수행
    console.log('타이머 시작!', goals);

    // API 호출이나 다른 작업이 필요하면 여기서 처리
    // await startTimer(goals);

    // 부모에게 "시작했어"라고만 알려줌
    onStartTimer();
  };

  const handleCancel = () => {
    setGoals([]);
    setInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[500px] rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">공부 목표 설정</h2>

        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddGoal();
                }
              }}
              placeholder="목표를 입력하세요"
              className="flex-1 rounded border border-gray-300 px-3 py-2"
            />
            <button
              onClick={handleAddGoal}
              className="rounded bg-[#4c79ff] px-4 py-2 text-white hover:bg-[#3d5fa3]"
            >
              추가
            </button>
          </div>
        </div>

        <div className="mb-6">
          {goals.length > 0 ? (
            <div className="space-y-2">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-100 px-3 py-2"
                >
                  <span>{goal}</span>
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">추가된 목표가 없습니다</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="flex-1 rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleStart}
            className="flex-1 rounded bg-[#4c79ff] px-4 py-2 text-white hover:bg-[#3d5fa3]"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
