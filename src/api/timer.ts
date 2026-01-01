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
  splitTimes,
}: {
  timerId: string;
  splitTimes: Array<{ date: string; timeSpent: number }>;
}) {
  // date가 이미 포함되어 있으므로 그대로 전송
  const response = await axiosInstance.put(`/api/timers/${timerId}`, {
    splitTimes,
  });

  return response.data;
}

export async function deleteTimer(timerId: string) {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  return response.data;
}

export async function stopTimer({
  timerId,
  splitTimes,
  review,
  tasks,
}: {
  timerId: string;
  splitTimes: { date: string; timeSpent: number }[];
  review: string;
  tasks: { content: string; isCompleted: boolean }[];
}) {
  const response = await axiosInstance.post(`/api/timers/${timerId}/stop`, {
    splitTimes,
    review,
    tasks,
  });

  return response.data;
}
