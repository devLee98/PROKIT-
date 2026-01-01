import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import editIcon from '../../assets/edit.svg';
import { useUpdateStudyLog } from '../../hooks/mutation/use-update-study-log';
import { useGetDetailStudyLog } from '../../hooks/query/use-get-detail-study-log';
import EditCard from '../edit-card';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyLogId: string;
  hasStarted: boolean;
}

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function EditGoalModal({
  isOpen,
  onClose,
  studyLogId,
  hasStarted,
}: EditGoalModalProps) {
  const { data: detailStudyLogData } = useGetDetailStudyLog(
    studyLogId,
    hasStarted,
  );

  // //lazy initializer
  // const [tasks, setTasks] = useState<Task[]>(
  //   () => detailStudyLogData?.data?.tasks ?? [],
  // );

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isOpen && detailStudyLogData?.data?.tasks) {
      setTasks(detailStudyLogData.data.tasks);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [isOpen, detailStudyLogData]);

  const { mutate: updateStudyLog } = useUpdateStudyLog(studyLogId, tasks);

  const handleAddGoal = () => {};
  const handleToggleTask = (id: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted } : task,
      ),
    );
  };
  const handleSave = () => {
    updateStudyLog();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

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
              <div className="mt-6 flex flex-col gap-3">
                {tasks?.map((goal: Task) => (
                  <EditCard
                    key={goal.id}
                    name={goal.content}
                    isCompleted={goal.isCompleted}
                    onToggle={(isCompleted) =>
                      handleToggleTask(goal.id, isCompleted)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 flex items-end justify-end">
          <div className="flex h-[48px] gap-4">
            <button
              onClick={handleCancel}
              className="w-[64px] bg-[#e5e7eb] px-4 py-3"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="w-[100px] bg-[#e5e7eb] px-4 py-3"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
