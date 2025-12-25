import { API_URL } from '../../constant.ts';
import axiosInstance from '../utils/axios-instance.ts';
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function signOut() {
  const response = await axiosInstance.post(`${API_URL}/api/auth/logout`);
  const data = response.data;
  return data;
}
