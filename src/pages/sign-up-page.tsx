import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/sign-up';
import { useSignUpCheckEmail } from '../hooks/query/use-sign-up-check-email';
import { useSignUpCheckNickname } from '../hooks/query/use-sign-up-check-nickname';
import { signUpSchema, type SignUpFormValues } from '../schema/auth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 이메일 중복확인
  const email = watch('email');
  const {
    data: checkEmailData,
    refetch: checkEmail,
    isFetching: checkEmailFetching,
  } = useSignUpCheckEmail(email);
  const emailValidationError = errors.email?.message;
  const showEmailError =
    checkEmailData?.available === false ? checkEmailData.message : null;

  const onCheckEmail = async () => {
    const currentEmail = getValues('email');

    if (emailValidationError) {
      return;
    }

    if (currentEmail) {
      await checkEmail();
    }
  };
  //닉네임 중복확인
  const nickname = watch('nickname');
  const {
    data: checkNicknameData,
    refetch: checkNickname,
    isFetching: checkNicknameFetching,
  } = useSignUpCheckNickname(nickname);
  const nicknameValidationError = errors.nickname?.message;
  const showNicknameError =
    checkNicknameData?.available === false ? checkNicknameData.message : null;

  const onCheckNickname = async () => {
    const currentNickname = getValues('nickname');

    if (nicknameValidationError) {
      return;
    }

    if (currentNickname) {
      await checkNickname();
    }
  };

  //비밀번호 일치 확인
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordValidationError = errors.password?.message;
  const confirmPasswordValidationError = errors.confirmPassword?.message;
  const showPasswordError =
    password === confirmPassword ? null : errors.confirmPassword?.message;

  const onToggleAgreed = () => {
    setIsAgreed(!isAgreed);
  };

  // 회원가입 버튼 활성화 조건
  const isSignUpEnabled =
    checkEmailData?.available === true && // 이메일 중복확인 통과
    checkNicknameData?.available === true && // 닉네임 중복확인 통과
    !passwordValidationError && // 비밀번호 유효성 통과
    !confirmPasswordValidationError && // 비밀번호 확인 유효성 통과
    isAgreed; // 이용약관 동의

  const onSubmit = (data: SignUpFormValues) => {
    signUp(data);
    navigate('/sign-in');
  };

  return (
    <div className="scrollbar-hide flex h-1/2 flex-col items-center overflow-y-auto bg-white">
      <p className="mt-[140px] mb-9 text-2xl font-bold">회원가입</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 flex h-[94px] w-[420px] flex-col gap-2">
          <p>아이디</p>
          <div className="flex gap-3">
            <input
              {...register('email')}
              className="h-[44px] flex-1 bg-[#f9fafb]"
              type="email"
              placeholder="이메일 주소 형식으로 입력해 주세요."
            />

            <button
              type="button"
              className="h-[44px] w-[84px] cursor-pointer bg-[#4c79ff] disabled:opacity-50"
              onClick={onCheckEmail}
              disabled={checkEmailFetching || !!emailValidationError} // ✅ 버튼 비활성화 조건
            >
              중복 확인
            </button>
          </div>
          {/* Zod 검증 에러 (형식 오류) */}
          {emailValidationError && (
            <p className="text-[12px] text-red-500">{emailValidationError}</p>
          )}

          {/* 결과값 에러 */}
          {!emailValidationError && showEmailError && (
            <p className="text-[12px] text-red-500">{showEmailError}</p>
          )}

          {/* 결과값 성공 */}
          {!emailValidationError && checkEmailData?.available === true && (
            <p className="text-[12px] text-green-500">
              사용 가능한 이메일입니다.
            </p>
          )}
        </div>

        <div className="mb-10 flex h-[94px] w-[420px] flex-col gap-2">
          <p>닉네임</p>
          <div className="flex gap-3">
            <input
              {...register('nickname')}
              className="h-[44px] flex-1 bg-[#f9fafb]"
              type="text"
              placeholder="닉네임을 입력해 주세요."
            />
            <button
              type="button"
              className="h-[44px] w-[84px] cursor-pointer bg-[#4c79ff] disabled:opacity-50"
              onClick={onCheckNickname}
              disabled={checkNicknameFetching || !!nicknameValidationError}
            >
              중복 확인
            </button>
          </div>
          {nicknameValidationError && (
            <p className="text-[12px] text-red-500">
              {nicknameValidationError}
            </p>
          )}
          {!nicknameValidationError && showNicknameError && (
            <p className="text-[12px] text-red-500">{showNicknameError}</p>
          )}
          {!nicknameValidationError &&
            checkNicknameData?.available === true && (
              <p className="text-[12px] text-green-500">
                사용 가능한 닉네임입니다.
              </p>
            )}
        </div>

        <div className="mb-10 flex h-[94px] w-[420px] flex-col gap-2">
          <p>비밀번호</p>
          <div>
            <input
              {...register('password')}
              className="h-[44px] w-full bg-[#f9fafb]"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
          {passwordValidationError && (
            <p className="text-[12px] text-red-500">
              {passwordValidationError}
            </p>
          )}
        </div>

        <div className="mb-15 flex h-[94px] w-[420px] flex-col gap-2">
          <p>비밀번호 확인</p>
          <div>
            <input
              {...register('confirmPassword')}
              className="h-[44px] w-full bg-[#f9fafb]"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
            />
          </div>
          {confirmPasswordValidationError && (
            <p className="text-[12px] text-red-500">
              {confirmPasswordValidationError}
            </p>
          )}
          {!confirmPasswordValidationError && showPasswordError && (
            <p className="text-[12px] text-red-500">{showPasswordError}</p>
          )}
        </div>

        <div className="flex w-[420px] flex-col gap-2">
          <div className="flex justify-between">
            <p>이용약관</p>
            <div className="flex gap-2">
              <p>동의함</p>
              <input type="checkbox" onChange={onToggleAgreed} />
            </div>
          </div>

          <div className="h-[110px] overflow-y-auto">
            <span className="font-bold">제1조 (목적)</span> <br /> 이 약관은
            DevTime(이하 “서비스”)의 이용 조건 및 절차, 사용자와 서비스
            제공자(회사) 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            <br />
            <span className="font-bold">제2조 (정의)</span> <br /> 서비스:
            개발자들이 일상 업무 및 할 일을 효과적으로 관리할 수 있도록 제공되는
            DevTime(데브타임) TODO 앱 및 관련 기능을 말합니다. 사용자: 이 약관에
            따라 서비스를 이용하는 개인 및 단체를 의미합니다. 계정: 사용자가
            서비스를 이용하기 위해 등록하는 고유 식별 정보를 의미합니다. <br />
            <span className="font-bold">제3조 (약관의 효력 및 변경)</span>
            <br />본 약관은 사용자가 서비스에 최초 가입하거나 서비스를 이용하는
            시점부터 효력을 발생합니다. 회사는 필요에 따라 본 약관을 변경할 수
            있으며, 변경된 약관은 앱 내 공지사항 또는 이메일 등으로 사전에
            고지합니다.
            <br />
            <span className="font-bold">제4조 (서비스 제공 및 변경)</span>
            <br /> 회사는 사용자가 할 일을 등록, 수정, 삭제하고 일정을 관리할 수
            있도록 서비스를 제공합니다. 서비스의 일부 기능 또는 전체 서비스를
            사전 예고 없이 변경하거나 중단할 수 있으며, 이로 인한 책임은 회사가
            부담하지 않습니다.
            <br />
            <span className="font-bold">제5조 (사용자의 의무)</span> 사용자는
            서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다. 사용자는
            본인의 계정 및 비밀번호를 안전하게 관리하며, 타인에게 양도하거나
            공유할 수 없습니다. 사용자는 서비스 이용 과정에서 다음과 같은 행위를
            해서는 안 됩니다: 타인의 권리를 침해하거나 불법적인 목적으로
            서비스를 이용하는 행위 허위 정보를 기재하거나 부정한 방법으로
            서비스를 이용하는 행위 회사의 정상적인 서비스 운영을 방해하는 행위
            <br />
            <span className="font-bold">제6조 (개인정보 보호)</span>
            <br />
            회사는 개인정보 보호 관련 법령을 준수하며, 별도의 개인정보
            처리방침에 따라 사용자의 개인정보를 안전하게 관리합니다. 사용자는
            서비스 이용을 위해 필요한 최소한의 개인정보를 제공하며, 해당 정보는
            서비스 제공 목적에 한해서만 사용됩니다. 제7조 (서비스 이용 제한 및
            중지) 회사는 사용자가 본 약관을 위반한 경우 경고 후 서비스 이용을
            제한하거나 중지할 수 있습니다. 사용자는 본 약관 위반 시 발생하는
            모든 결과에 대해 책임을 지며, 회사는 이에 대해 어떠한 책임도 지지
            않습니다. 제8조 (책임의 제한) 회사는 천재지변, 불가항력적 사유, 또는
            통신 장애 등으로 인한 서비스 제공 중단에 대해 책임을 지지 않습니다.
            회사는 사용자가 서비스를 이용하여 발생한 데이터 손실, 업무상 손해
            등에 대해 책임을 제한합니다. 제9조 (준거법 및 관할법원) 본 약관은
            대한민국 법률에 따라 해석 및 적용됩니다. 서비스 이용과 관련하여
            발생한 분쟁은 회사 본사 소재지를 관할하는 법원을 제1심 관할법원으로
            합니다. 제10조 (부칙) 본 약관은 2024년 2월 1일부터 시행됩니다. 본
            약관에 명시되지 않은 사항은 관련 법령 및 회사의 내부 정책에
            따릅니다.
          </div>
        </div>

        <button
          className="mt-9 mb-6 h-[48px] w-[420px] shrink-0 cursor-pointer bg-[#4c79ff] disabled:opacity-50"
          disabled={!isSignUpEnabled}
        >
          회원가입
        </button>
      </form>
      <div className="mb-[150px] flex items-center gap-2">
        <p className="text-sm text-[#4c79ff]">회원이신가요?</p>
        <a
          className="text-md font-bold text-[#4c79ff] underline"
          href="/sign-in"
        >
          로그인 바로가기
        </a>
      </div>
    </div>
  );
}
