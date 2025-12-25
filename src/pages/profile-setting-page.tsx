import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import chevronDownIcon from '../assets/chevron-down.svg';
import plusIcon from '../assets/plus.svg';
import Chip from '../components/chip';
import useDetectClose from '../hooks/custom/use-detect-close';
import { usePostFile } from '../hooks/mutation/use-post-file';
import { usePostProfile } from '../hooks/mutation/use-post-profile';
import { useTechStackData } from '../hooks/query/use-tech-stack-data';
import type { ProfileSettingFormData } from '../types/profile';

export default function ProfileSettingPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<ProfileSettingFormData>({
    defaultValues: {
      career: '',
      purpose: '',
      goal: '',
      techStacks: [],
      profileImage: '',
    },
  });

  // watch 사용
  const career = watch('career');
  const purpose = watch('purpose');
  const techStacks = watch('techStacks');

  // 개발경력관련
  const [techStackSearch, setTechStackSearch] = useState<string>('');
  const careerDropdownRef = useRef<HTMLDivElement>(null);
  const careerOptions = [
    { value: '1', label: '경력 없음' },
    { value: '2', label: '0 - 3년' },
    { value: '3', label: '4 - 7년' },
    { value: '4', label: '8 - 10년' },
    { value: '5', label: '11년 이상' },
  ];
  const [isCareerOpen, setIsCareerOpen] = useDetectClose(
    careerDropdownRef as React.RefObject<HTMLDivElement>,
    false,
  );

  const selectedCareerLabel = career || '개발 경력을 선택해 주세요.';

  const isCareerSelected = !!career;

  const toggleCareerOpen = () => {
    setIsCareerOpen(!isCareerOpen);
  };

  //공부목적관련
  const purposeDropdownRef = useRef<HTMLDivElement>(null);
  const purposeOptions = [
    { value: '1', label: '취업 준비' },
    { value: '2', label: '이직 준비' },
    { value: '3', label: '단순 개발 역량 향상' },
    { value: '4', label: '회사 내 프로젝트 원활하게 수행' },
    { value: '5', label: '기타(직접입력)' },
  ];
  const [isPurposeOpen, setIsPurposeOpen] = useDetectClose(
    purposeDropdownRef as React.RefObject<HTMLDivElement>,
    false,
  );

  const selectedPurposeLabel = purpose || '공부 목적을 선택해 주세요.';

  const isPurposeSelected = !!purpose;

  const togglePurposeOpen = () => {
    setIsPurposeOpen(!isPurposeOpen);
  };

  // 기술스택관련
  const { data: techStackData } = useTechStackData(techStackSearch);

  const techStackDropdownRef = useRef<HTMLDivElement>(null);
  const [isTechStackOpen, setIsTechStackOpen] = useDetectClose(
    techStackDropdownRef as React.RefObject<HTMLDivElement>,
    false,
  );
  const onChangeTechStackSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStackSearch(e.target.value);
    setIsTechStackOpen(true);
  };

  //프로필 이미지관련
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 파일 크기 검증
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      e.target.value = ''; // input 초기화
      return;
    }

    // 파일 형식 검증 (png, jpg만 허용)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('파일 형식은 PNG 또는 JPG만 가능합니다.');
      e.target.value = ''; // input 초기화
      return;
    }
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue('profileImage', result);
    };
    reader.readAsDataURL(file);
  };

  //제출하기
  const { mutate: postFile } = usePostFile();
  const { mutate: postProfile } = usePostProfile();
  const onSubmit = (data: ProfileSettingFormData) => {
    // 1. usePostFile 호출
    postFile(
      { fileName: data.profileImage, contentType: 'image/png' },
      {
        onSuccess: (response) => {
          const key = response.key;

          data.profileImage = key;

          postProfile(data);
        },
      },
    );
  };

  return (
    <div className="scrollbar-hide flex h-1/2 flex-col items-center overflow-y-auto bg-white">
      <p className="mt-[140px] mb-9 text-2xl font-bold">프로필 설정</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 flex h-[70px] w-[420px] flex-col gap-2">
          <label>개발경력</label>
          <div ref={careerDropdownRef} className="relative">
            <button
              type="button"
              onClick={toggleCareerOpen}
              className={`mt-2 flex h-[44px] w-[420px] items-center justify-between bg-[#f9fafb] px-4 py-3 text-left ${
                !isCareerSelected ? 'text-gray-400' : 'text-black'
              }`}
            >
              {selectedCareerLabel}
              <img
                src={chevronDownIcon}
                alt="chevron-down"
                className="h-6 w-6"
              />
            </button>
            {isCareerOpen && (
              <ul className="absolute top-[60px] z-10 w-[420px] rounded border border-gray-200 bg-white">
                {careerOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setValue('career', option.label);
                      toggleCareerOpen();
                    }}
                    className="cursor-pointer px-4 py-3 hover:bg-gray-100"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-10 flex w-[420px] flex-col gap-2">
          <label>공부 목적</label>
          <div ref={purposeDropdownRef} className="relative">
            <button
              type="button"
              onClick={togglePurposeOpen}
              className={`mt-2 flex h-[44px] w-[420px] items-center justify-between bg-[#f9fafb] px-4 py-3 text-left ${
                !isPurposeSelected ? 'text-gray-400' : 'text-black'
              }`}
            >
              {selectedPurposeLabel}
              <img
                src={chevronDownIcon}
                alt="chevron-down"
                className="h-6 w-6"
              />
            </button>
            {isPurposeOpen && (
              <ul className="absolute top-[60px] z-10 w-[420px] rounded border border-gray-200 bg-white">
                {purposeOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setValue('purpose', option.label);
                      togglePurposeOpen();
                    }}
                    className="cursor-pointer px-4 py-3 hover:bg-gray-100"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
            {purpose === '5' && (
              <input
                {...register('purpose')}
                className="mt-2 h-[44px] w-[420px] bg-[#f9fafb] px-4 py-3"
                type="text"
                placeholder="공부 목적을 입력해 주세요."
              />
            )}
          </div>
        </div>

        <div className="mb-10 flex h-[70px] w-[420px] flex-col gap-2">
          <label>공부 목표</label>
          <input
            {...register('goal')}
            className="h-[44px] w-[420px] bg-[#f9fafb] px-4 py-3"
            type="text"
            placeholder="공부 목표를 입력해 주세요."
          />
        </div>

        <div className="mb-10 flex w-[420px] flex-col gap-2">
          <label>공부/사용중인 기술 스택</label>
          <div ref={techStackDropdownRef} className="relative">
            <input
              value={techStackSearch}
              onChange={onChangeTechStackSearch}
              className="h-[44px] w-[420px] bg-[#f9fafb] px-4 py-3"
              type="text"
              placeholder="기술 스택을 검색해 등록해 주세요."
              onFocus={() => {
                if (techStackSearch.length > 0) {
                  setIsTechStackOpen(true);
                }
              }}
            />
            {isTechStackOpen && techStackSearch.length > 0 && (
              <ul className="absolute top-[60px] z-10 w-[420px] rounded border border-gray-200 bg-white">
                {techStackData?.results?.map(
                  (tech: { name: string; id: string }) => (
                    <li
                      key={tech.id}
                      onClick={() => {
                        setValue('techStacks', [...techStacks, tech.name]);
                        setTechStackSearch('');
                      }}
                      className="cursor-pointer px-4 py-3 hover:bg-gray-100"
                    >
                      {tech.name}
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {/* flex-wrap하면 부모 못넘어가? */}
            {techStacks.map((tech, index) => (
              <Chip
                key={index}
                name={tech}
                onRemove={() => {
                  setValue(
                    'techStacks',
                    techStacks.filter((_, i) => i !== index),
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-9 flex h-[146px] w-[420px] flex-col gap-2">
          <label>프로필 이미지</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
          {previewImage ? (
            <div className="relative flex h-30 w-30 items-center justify-center rounded-[8px]">
              <img
                src={previewImage}
                alt="프로필 미리보기"
                className="h-30 w-30 rounded-[8px] border border-solid object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleFileInputClick}
              className="flex h-30 w-30 items-center justify-center rounded-[8px] border border-dashed border-[#4c79ff] focus:outline-none"
            >
              <img src={plusIcon} alt="plus" className="h-9 w-9" />
            </button>
          )}
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
        className="h-[48px] w-[420px] shrink-0 rounded-full bg-[#4c79ff] text-white"
      >
        저장하기
      </button>

      <div className="mt-6 mb-[108px] flex h-[20px] w-[220px] shrink-0 items-center gap-3">
        <p className="text-[16px] text-gray-500">다음에 하시겠어요?</p>
        <Link to="/">
          <p className="text-[16px] text-gray-500 underline">건너뛰기</p>
        </Link>
      </div>
    </div>
  );
}
