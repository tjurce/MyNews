import { useNavigate } from "react-router-dom";
import "./Logo.scss";

interface LogoProps {
  onHamburgerClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onHamburgerClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // navigate back to homepage / board
  };

  return (
    <div className="logo">
      {/* Wrap both spans in a clickable container */}
      <span
        className="logo__red"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        My
      </span>
      <span
        className="logo__black"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        News
      </span>

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
