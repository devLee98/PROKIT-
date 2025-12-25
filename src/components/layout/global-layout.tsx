import { Outlet } from 'react-router-dom';
import wlogo from '../../assets/(w)logo.svg';

export default function GlobalLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-1/2 items-center justify-center bg-[#4c79ff]">
        <img className="h-[200px] w-[264px]" src={wlogo} alt="logo" />
      </div>
      <Outlet />
    </div>
  );
}
