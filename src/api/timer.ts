import axiosInstance from '../utils/axios-instance';

export async function getTimer() {
  const response = await axiosInstance.get('/api/timers');

  return response.data;
}

export async function postTimer({
  todayGoal,
  tasks,
}: {
  todayGoal: string;
  tasks: string[];
}) {
  const response = await axiosInstance.post('/api/timers', {
    todayGoal,
    tasks,
  });

  return response.data;
}

export async function updateTimer({
  timerId,
  timeSpent,
}: {
  timerId: string;
  timeSpent: number;
}) {
  const date = new Date().toISOString(); //UTC 시간
  const response = await axiosInstance.put(`/api/timers/${timerId}`, {
    splitTimes: [
      {
        date,
        timeSpent,
      },
    ],
  });

  return response.data;
}
