import { useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import defaultAvatarImage from '../../assets/default-avatar.png';
import logo from '../../assets/logo-name.svg';

import { IMAGE_URL } from '../../../constant';
import useDetectClose from '../../hooks/custom/use-detect-close';
import { useSignOut } from '../../hooks/mutation/use-sign-out';
import { useGetProfileData } from '../../hooks/query/use-get-profile-data';
import { useCheckAuth, useIsLoggedIn } from '../../store/auth-store';

export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useDetectClose(
    dropdownRef as React.RefObject<HTMLDivElement>,
    false,
  );
  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetProfileData();
  const imageUrl = profileData?.profile?.profileImage
    ? `${IMAGE_URL}/${profileData.profile.profileImage}`
    : defaultAvatarImage;
  const checkAuth = useCheckAuth();
  const isLoggedIn = useIsLoggedIn();
  const { mutate: signOut } = useSignOut();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mx-auto mt-4 flex h-[40px] max-w-[1200px] items-center justify-between">
        <div className="flex h-[40px] w-[316px] items-center justify-between">
          <Link to="/">
            <img className="h-[40px] w-[148px]" src={logo} alt="logo" />
          </Link>
          <div className="flex h-[20px] w-[120px] items-center justify-between text-[16px] font-medium text-[#023e99]">
            <Link to="/dashboard" className="hover:font-bold">
              대쉬보드
            </Link>
            <Link to="/ranking" className="hover:font-bold">
              랭킹
            </Link>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex h-[40px] items-center justify-between"
            onClick={toggleModalOpen}
          >
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-4">
                  {/* 안전성 추가 */}
                  {isLoggedIn && !isProfileDataLoading && (
                    <>
                      <img
                        className="h-[40px] w-[40px] rounded-full"
                        src={imageUrl}
                        alt="프로필이미지"
                      />
                      <p>{profileData.nickname}</p>
                    </>
                  )}
                </div>
                {isModalOpen && (
                  <div>
                    <div className="absolute top-12 left-0 flex h-[104px] w-[130px] flex-col justify-between gap-2 border border-[#ccddd6] bg-white px-3 py-4">
                      <div className="h-[20px] w-[106px] hover:font-bold">
                        <Link to="/my">마이페이지</Link>
                      </div>
                      <div className="h-[20px] w-[106px] hover:font-bold">
                        <button onClick={() => signOut()}>로그아웃</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/sign-in">로그인</Link>
                <Link to="/sign-up">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
