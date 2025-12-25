import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import logo from '../assets/logo.svg';
import { useSignIn } from '../hooks/mutation/use-sign-in';
import { signInSchema, type SignInFormValues } from '../schema/auth';

export default function SignInPage() {
  const { mutate: signIn } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: SignInFormValues) => {
    signIn(data);
  };

  const showEmailError = touchedFields.email && errors.email;
  const showPasswordError = touchedFields.password && errors.password;

  return (
    <div className="flex h-screen items-center justify-center bg-[#4c79ff]/10">
      <div className="container mx-auto h-[598px] w-[500px] bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <img className="mt-18 h-[100px] w-[132px]" src={logo} alt="logo" />
          <div className="mt-12 flex h-[94px] w-[328px] flex-col gap-2">
            <p className="text-sm font-medium">아이디</p>
            <input
              {...register('email')}
              className={`text-4 placeholder:text-4 h-[44px] w-[328px] border bg-[#f9fafb] px-4 py-3 focus:outline-none ${showEmailError ? 'border-red-500' : 'border-transparent'}`}
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
            />
            {showEmailError && (
              <p className="text-[12px] text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mt-3 flex h-[94px] w-[328px] flex-col gap-2">
            <p className="text-sm font-medium">비밀번호</p>
            <input
              {...register('password')}
              className={`text-4 placeholder:text-4 h-[44px] w-[328px] border bg-[#f9fafb] px-4 py-3 focus:outline-none ${showPasswordError ? 'border-red-500' : 'border-transparent'}`}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
            {showPasswordError && (
              <p className="text-[12px] text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`mt-6 h-[44px] w-[328px] px-4 py-3 text-white ${isValid ? 'bg-[#4c79ff]' : 'bg-[#969da8]'}`}
          >
            로그인
          </button>

          <a href="/sign-up" className="pt-6">
            회원가입
          </a>
        </form>
      </div>
    </div>
  );
}
