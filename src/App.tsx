import { Route, Routes } from 'react-router-dom';
import './App.css';
import GlobalLayout from './components/layout/global-layout';
import Header from './components/layout/header';
import { ErrorModal } from './components/modal/error-modal';
import ProtectedRoute from './components/protected-route';
import DashboardPage from './pages/dashboard-page';
import IndexPage from './pages/index-page';
import MyPage from './pages/my-page';
import ProfilePage from './pages/profile-page';
import ProfileSettingPage from './pages/profile-setting-page';
import RankingPage from './pages/ranking-page';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <RankingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<GlobalLayout />}>
          <Route path="/profile-setting" element={<ProfileSettingPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      <ErrorModal />
    </>
  );
}

export default App;
