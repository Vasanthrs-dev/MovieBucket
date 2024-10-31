export default function Logo({ onClose }) {
  return (
    <div className="logo" onClick={onClose}>
      <span role="img">🍿</span>
      <h1>MovieBucket</h1>
    </div>
  );
}
