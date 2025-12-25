import { API_URL } from '../../constant';

export async function getPresignedUrl({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}) {
  const response = await fetch(`${API_URL}/api/file/presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ fileName, contentType }),
  });
  if (!response.ok) {
    throw new Error('Failed to get presigned url');
  }
  const data = await response.json();

  return data;
}
