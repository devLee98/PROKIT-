import axiosInstance from '../utils/axios-instance';

export async function getStudyTitle() {
  const today = new Date().toISOString().split('T')[0];
  const response = await axiosInstance.get('/api/study-logs', {
    params: {
      page: 1,
      limit: 1,
      date: today,
    },
  });
  return response.data;
}
