import { API_URL } from '../../constant';
import axiosInstance from '../utils/axios-instance';

export async function postProfile({
  career,
  purpose,
  goal,
  techStacks,
  profileImage,
}: {
  career: string;
  purpose: string;
  goal: string;
  techStacks: string[];
  profileImage: string;
}) {
  const response = await fetch(`${API_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      career: career,
      purpose: purpose,
      goal: goal,
      techStacks: techStacks,
      profileImage: profileImage,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getProfile() {
  const response = await axiosInstance.get('/api/profile');
  return response.data;
}
