import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GamePage from './pages/Game';
import SignIn from './pages/SignIn';
import useToken from './hooks/useToken';
import SignUp from './pages/SignUp';
import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';

export default function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteGuard>
                    <GamePage />
                  </ProtectedRouteGuard>
                }
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Routes>
          </Router>
        </GameProvider>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
