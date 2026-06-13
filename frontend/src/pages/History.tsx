import { useEffect, useState } from 'react';

export default function History() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Mock history fetch
    setHistory([
      "User logged in at 10:00 AM",
      "Screening completed for Supplier C",
      "Document uploaded: contract.pdf"
    ]);
  }, []);

  return (
    <div>
      <h2>History</h2>
      <div className="card" data-testid="history-list">
        <ul>
          {history.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
}
