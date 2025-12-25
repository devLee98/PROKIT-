import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo-name.svg';
import { useCheckAuth, useIsLoggedIn, useLogout } from '../../store/auth-store';

export default function Header() {
  const checkAuth = useCheckAuth();
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="container mx-auto">
      <header className="flex h-[40px] max-w-[1200px] items-center justify-between">
        <div className="flex h-[40px] w-[316px] items-center justify-between">
          <img className="h-[40px] w-[148px]" src={logo} alt="logo" />
          <nav className="flex h-[20px] w-[120px] items-center justify-between">
            <Link to="/dashboard">대쉬보드</Link>
            <Link to="/ranking">랭킹</Link>
          </nav>
        </div>
        <div className="flex h-[20px] w-[134px] items-center justify-between">
          {isLoggedIn ? (
            <>
              <Link to="/profile">프로필</Link>
              <Link to="/sign-in" onClick={handleLogout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">로그인</Link>
              <Link to="/sign-up">회원가입</Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
