import { IMAGE_URL } from '../../constant';
import StackCard from '../components/my/stack-card';
import { useGetProfileData } from '../hooks/query/use-get-profile-data';

export default function MyPage() {
  const { data: profileData, isLoading } = useGetProfileData();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const imageUrl = `${IMAGE_URL}/${profileData.profile.profileImage}`;
  console.log('profileImage 값:', profileData.profile.profileImage);
  console.log('전체 imageUrl:', imageUrl);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-10 flex h-[430px] w-[1200px] justify-between bg-white p-9">
        <img className="h-[160px] w-[160px]" src={imageUrl} alt="profile" />
        <div className="flex h-[358px] w-[746px] flex-col">
          <div className="flex h-[56px] flex-col justify-between text-[#023e99]">
            <p>{profileData!.nickname}</p>
            <p className="text-2xl font-bold">{profileData!.profile.goal}</p>
          </div>
          <div className="mt-12 mb-6 flex h-[44px] flex-col justify-between">
            <p className="text-[14px] font-semibold text-[#969da8]">이메일</p>
            <p className="text-[18px] font-semibold text-[#4b5563]">
              {profileData!.email}
            </p>
          </div>
          <div className="mb-6 flex h-[44px] flex-col justify-between">
            <p className="text-[14px] font-semibold text-[#969da8]">
              개발 경력
            </p>
            <p className="text-[18px] font-semibold text-[#4b5563]">
              {profileData!.profile.career}
            </p>
          </div>
          <div className="mb-6 flex h-[44px] flex-col justify-between">
            <p className="text-[14px] font-semibold text-[#969da8]">
              공부 목적
            </p>
            <p className="text-[18px] font-semibold text-[#4b5563]">
              {profileData!.profile.purpose}
            </p>
          </div>
          <div className="flex h-[44px] flex-col justify-between">
            <p className="text-[14px] font-semibold text-[#969da8]">개발스택</p>
            <div className="flex flex-wrap gap-2">
              {profileData?.profile.techStacks.map((tech: string) => (
                <StackCard key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <button>프로필 수정</button>
        </div>
      </div>
    </div>
  );
}
