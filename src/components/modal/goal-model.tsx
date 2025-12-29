import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import trashIcon from '../../assets/trash.svg';
import { usePostTimer } from '../../hooks/mutation/use-post-timer';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTimer: (timerId: string) => void;
}

interface FormSchema {
  todayGoal: string;
  tasks: string[];
}

export default function GoalModal({
  isOpen,
  onClose,
  onStartTimer,
}: GoalModalProps) {
  const [inputValue, setInputValue] = useState('');

  const { register, handleSubmit, watch, setValue } = useForm<FormSchema>({
    defaultValues: {
      todayGoal: '',
      tasks: [],
    },
  });

  const tasks = watch('tasks');
  const handleAddGoal = () => {
    if (inputValue.trim()) {
      //이문법 뭐지?
      setValue('tasks', [...watch('tasks'), inputValue.trim()]);
      setInputValue('');
    }
  };

  const { mutate: postTimer } = usePostTimer();
  const onSubmit = (data: FormSchema) => {
    postTimer(data, {
      onSuccess: (response) => {
        setInputValue('');
        onStartTimer(response.timerId);
      },
    });
  };

  const handleRemoveGoal = (index: number) => {
    setValue(
      'tasks',
      tasks.filter((_, i) => i !== index),
    );
  };

  const handleCancel = () => {
    setValue('tasks', []);
    setInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        className="w-[640px] rounded-lg bg-white px-9 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          {...register('todayGoal')}
          className="mb-9 h-[46px] w-full text-4xl font-bold focus:outline-none"
          type="text"
          placeholder="오늘의목표"
        />

        <div className="mb-4">
          <div>
            <p className="mb-2 text-sm font-medium">할 일 목록</p>
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
        </div>

        <div className="mb-6 h-[460px] overflow-y-auto">
          {tasks.length > 0 && (
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex h-[72px] items-center justify-between rounded bg-[#4c79ff] px-3 py-2 text-white"
                >
                  <span>{task}</span>
                  <button onClick={() => handleRemoveGoal(index)}>
                    <img
                      className="h-[24px] w-[24px]"
                      src={trashIcon}
                      alt="trash"
                    />
                  </button>
                </div>
              ))}
            </div>
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
            onClick={handleSubmit(onSubmit)}
            className="flex-1 rounded bg-[#4c79ff] px-4 py-2 text-white hover:bg-[#3d5fa3]"
            disabled={watch('tasks').length === 0}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
