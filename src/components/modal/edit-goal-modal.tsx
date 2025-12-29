import { createPortal } from 'react-dom';
import editIcon from '../../assets/edit.svg';
import { useGetDetailStudyLog } from '../../hooks/query/use-get-detail-study-log';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  studyLogId: string | undefined;
  isRunning: boolean;
}

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function EditGoalModal({
  isOpen,
  onClose,
  onSave,
  studyLogId,
  isRunning,
}: EditGoalModalProps) {
  const { data: detailStudyLogData } = useGetDetailStudyLog(
    studyLogId,
    isRunning,
  );
  const handleAddGoal = () => {};
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[640px] rounded-lg bg-white px-9 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="할 일을 추가해 주세요"
                className="flex-1 rounded border border-gray-300 px-3 py-2"
              />
              <button
                onClick={handleAddGoal}
                className="rounded bg-[#4c79ff] px-4 py-2 text-white hover:bg-[#3d5fa3]"
              >
                추가
              </button>
            </div>
            <div>
              <div className="mt-9 flex items-center justify-between gap-2">
                <p>할 일 목록</p>
                <button>
                  <img src={editIcon} alt="edit" />
                </button>
              </div>
              {detailStudyLogData?.data?.tasks?.map((goal: Task) => (
                <div key={goal.id}>
                  <p>{goal.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
