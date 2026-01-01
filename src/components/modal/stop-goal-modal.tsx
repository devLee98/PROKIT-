import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import editIcon from '../../assets/edit.svg';
import { useStopTimer } from '../../hooks/mutation/use-stop-timer';
import { useGetDetailStudyLog } from '../../hooks/query/use-get-detail-study-log';
import EditCard from '../edit-card';

interface StopGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerId: string;
  studyLogId: string;
  hasStarted: boolean;
  splitTimes: Array<{ date: string; timeSpent: number }>;
  onComplete: () => void;
}

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export default function StopGoalModal({
  isOpen,
  onClose,
  timerId,
  studyLogId,
  hasStarted,
  splitTimes,
  onComplete,
}: StopGoalModalProps) {
  const { data: detailStudyLogData } = useGetDetailStudyLog(
    studyLogId,
    hasStarted,
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [review, setReview] = useState('');
  const { mutate: stopTimer } = useStopTimer({
    timerId,
    splitTimes,
    review,
    tasks,
    studyLogId,
    onComplete,
  });

  const handleSave = () => {
    stopTimer();
  };

  const handleToggleTask = (id: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted } : task,
      ),
    );
  };

  useEffect(() => {
    if (isOpen && detailStudyLogData?.data?.tasks) {
      setTasks(detailStudyLogData.data.tasks);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [isOpen, detailStudyLogData]);
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
            <div className="mb-9 flex flex-col gap-2">
              <p>오늘도 수고하셨습니다!</p>
              <p>완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="할 일을 추가해 주세요"
                className="flex-1 rounded border border-gray-300 px-3 py-2"
              />
              <button className="rounded bg-[#4c79ff] px-4 py-2 text-white hover:bg-[#3d5fa3]">
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
            <div>
              <p>학습회고</p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="학습회고를 입력해 주세요"
                className="h-[84px] w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-9 flex items-end justify-end">
          <div className="flex h-[48px] gap-4">
            <button className="w-[64px] bg-[#e5e7eb] px-4 py-3">취소</button>
            <button
              className="w-[100px] bg-[#e5e7eb] px-4 py-3"
              onClick={handleSave}
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
