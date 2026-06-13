export default function Screening() {
  return (
    <div data-testid="screening-panel">
      <h2>Screening</h2>
      <div className="card">
        <h3>Pending Screenings</h3>
        <ul>
          <li>Supplier A - <span style={{ color: 'orange' }}>Pending Review</span></li>
          <li>Supplier B - <span style={{ color: 'green' }}>Clear</span></li>
        </ul>
      </div>
    </div>
  );
}
