import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Screening from './pages/Screening';
import History from './pages/History';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';

function ProtectedLayout() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="screening" element={<Screening />} />
        <Route path="history" element={<History />} />
        <Route path="upload" element={<Upload />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
