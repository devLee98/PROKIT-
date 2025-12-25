import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일은 필수 입력값입니다.')
    .email('이메일 형식으로 작성해 주세요.'),

  password: z
    .string()
    .trim()
    .min(1, '비밀번호는 필수 입력값입니다.')
    .min(8, '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.',
    }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, '이메일은 필수 입력값입니다.')
      .email('이메일 형식으로 작성해 주세요.'),

    nickname: z.string().trim().min(1, '닉네임은 필수 입력값입니다.'),

    password: z
      .string()
      .trim()
      .min(1, '비밀번호는 필수 입력값입니다.')
      .min(8, '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
        message: '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.',
      }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, '비밀번호 확인은 필수 입력값입니다.'),
  })
  .refine(
    (data) => {
      if (!data.confirmPassword || data.confirmPassword.trim() === '') {
        return true;
      }
      return data.password === data.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    },
  );

export type SignUpFormValues = z.infer<typeof signUpSchema>;
