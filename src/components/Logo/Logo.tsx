import "./Logo.scss";

interface LogoProps {
  onHamburgerClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onHamburgerClick }) => {
  return (
    <div className="logo">
      <span className="logo__red">My</span>
      <span className="logo__black">News</span>
      {/* Hamburger for mobile */}
      {onHamburgerClick && (
        <button className="logo__hamburger" onClick={onHamburgerClick}>
          <img src="/src/assets/Hamburger.png" alt="Menu" />
        </button>
      )}
    </div>
  );
};

export default Logo;
