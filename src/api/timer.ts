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
