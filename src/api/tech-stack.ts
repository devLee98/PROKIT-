import { API_URL } from '../../constant';

export async function getTechStack(techStackSearch: string) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('엑세스 토큰이 필요합니다.');
  }
  const response = await fetch(
    `${API_URL}/api/tech-stacks?keyword=${techStackSearch}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
}
