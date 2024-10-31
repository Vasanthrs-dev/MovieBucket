import Logo from "./Logo";

export default function NavBar({ children, onClose }) {
  return (
    <nav className="nav-bar">
      <Logo onClose={onClose} />
      {children}
    </nav>
  );
}
