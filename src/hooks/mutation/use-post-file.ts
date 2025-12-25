import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl } from '../../api/post-presigned-url';
import type { UploadFileData } from '../../types/upload-file';

export function usePostFile() {
  return useMutation({
    mutationFn: (data: UploadFileData) => getPresignedUrl(data),
  });
}
