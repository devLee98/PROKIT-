import axiosInstance from '../utils/axios-instance';

export async function getStudyLogs() {
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

export async function getDetailStudyLog(studyLogId: string) {
  const response = await axiosInstance.get(`/api/study-logs/${studyLogId}`);
  return response.data;
}

export async function updateStudyLog({
  studyLogId,
  tasks,
}: {
  studyLogId: string;
  tasks: { content: string; isCompleted: boolean }[];
}) {
  const response = await axiosInstance.put(`/api/${studyLogId}/tasks`, {
    tasks,
  });
  return response.data;
}
