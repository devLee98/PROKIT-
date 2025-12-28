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
  splitTimes: Array<{ timeSpent: number }>;
}) {
  // 각 항목에 date 추가
  const splitTimesWithDate = splitTimes.map((item) => ({
    date: new Date().toISOString(), //UTC 시간
    timeSpent: item.timeSpent,
  }));

  const response = await axiosInstance.put(`/api/timers/${timerId}`, {
    splitTimes: splitTimesWithDate,
  });

  return response.data;
}

export async function deleteTimer(timerId: string) {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  return response.data;
}
