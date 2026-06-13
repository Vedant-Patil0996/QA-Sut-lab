import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar" data-testid="sidebar">
      <h2 style={{ padding: '1rem', margin: 0 }}>QA SUT Lab</h2>
      <NavLink to="/home" className="sidebar-link">Home</NavLink>
      <NavLink to="/screening" className="sidebar-link">Screening</NavLink>
      <NavLink to="/history" className="sidebar-link">History</NavLink>
      <NavLink to="/upload" className="sidebar-link">Upload</NavLink>
      <NavLink to="/chat" className="sidebar-link">Chat</NavLink>
    </div>
  );
}
