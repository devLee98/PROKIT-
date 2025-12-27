import axiosInstance from '../utils/axios-instance';

export async function getStudyTitle() {
  const today = new Date().toLocaleDateString('en-CA');
  const response = await axiosInstance.get('/api/study-logs', {
    params: {
      page: 1,
      limit: 1,
      date: today,
    },
  });
  return response.data;
}
