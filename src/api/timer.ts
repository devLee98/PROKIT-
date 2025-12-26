import axiosInstance from '../utils/axios-instance';

export async function getTimer() {
  const response = await axiosInstance.get('/api/timers');

  return response.data;
}
