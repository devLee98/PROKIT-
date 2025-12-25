import axios from 'axios';
import { API_URL } from '../../constant';
import { useAuthStore } from '../store/auth-store';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // 새 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        useAuthStore.setState({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 → 로그아웃
        useAuthStore.getState().logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    // ✅ 다른 에러들 처리
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          console.error('400 Bad Request:', data);
          error.message = data?.message || '잘못된 요청입니다';
          break;

        case 403:
          console.error('403 Forbidden:', data);
          error.message = data?.message || '접근 권한이 없습니다';
          break;

        case 404:
          console.error('404 Not Found:', data);
          error.message = data?.message || '요청한 리소스가 없습니다';
          break;

        case 409:
          console.error('409 Conflict:', data);
          error.message = data?.message || '중복된 데이터입니다';
          break;

        case 500:
          console.error('500 Server Error:', data);
          error.message = data?.message || '서버 오류가 발생했습니다';
          break;

        default:
          console.error(`HTTP Error ${status}:`, data);
          error.message = data?.message || `요청 실패 (${status})`;
      }
    } else if (error.request) {
      // 요청은 했지만 응답을 받지 못함 (네트워크 에러)
      console.error('Network Error:', error);
      error.message = '네트워크 연결을 확인하세요';
    } else {
      // 요청을 설정하는 과정에서 에러
      console.error('Request Setup Error:', error);
      error.message = error.message || '요청 설정 중 오류가 발생했습니다';
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
