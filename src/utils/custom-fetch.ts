import { useAuthStore } from '../store/auth-store';

const customFetch = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  let response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  // 401 에러면 토큰 갱신 후 재시도
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) {
      // 토큰 갱신 실패 → 로그아웃
      useAuthStore.getState().logout();
      window.location.href = '/sign-in';
      throw new Error('Token refresh failed');
    }

    const newData = await refreshResponse.json();
    const newAccessToken = newData.accessToken;
    const newRefreshToken = newData.refreshToken;

    // 새 토큰 저장
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    // 원래 요청 재시도 (새 accessToken 포함)
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

export default customFetch;
