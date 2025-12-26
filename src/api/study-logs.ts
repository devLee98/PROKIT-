import axiosInstance from '../utils/axios-instance';

export async function getStudyTitle() {
  const response = await axiosInstance.get(
    '/api/study-logs?page=1&limit=1&date=2025-12-26',
  );
  return response.data;
}
