import { useEffect } from 'react';

export default function Home() {
  // Intentional bug support
  useEffect(() => {
    if (import.meta.env.VITE_BUG_CONSOLE_ERROR === 'true') {
      console.error('Intentional console error injected for BUG_CONSOLE_ERROR');
    }
  }, []);

  return (
    <div data-testid="dashboard-content">
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card">
          <h3>Recent Activity</h3>
          <p>You have 5 new screening alerts to review today.</p>
        </div>
        <div className="card">
          <h3>System Status</h3>
          <p>All core services are operating normally.</p>
        </div>
      </div>
    </div>
  );
}
