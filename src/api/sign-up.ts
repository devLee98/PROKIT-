import { API_URL } from '../../constant';

export async function signUp({
  email,
  nickname,
  password,
  confirmPassword,
}: {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password, confirmPassword }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function checkEmail({ email }: { email: string }) {
  const query = new URLSearchParams({ email });
  const response = await fetch(`${API_URL}/api/signup/check-email?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function checkNickname({ nickname }: { nickname: string }) {
  const query = new URLSearchParams({ nickname });
  const response = await fetch(
    `${API_URL}/api/signup/check-nickname?${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}
