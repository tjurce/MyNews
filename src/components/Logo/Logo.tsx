import { useNavigate } from "react-router-dom";
import "./Logo.scss";

interface LogoProps {
  onHamburgerClick?: () => void;
  isMenuOpen?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  onHamburgerClick,
  isMenuOpen = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // navigate back to homepage / board
  };

  return (
    <>
      <div className={`logo ${isMenuOpen ? "logo--menu-open" : ""}`}>
        <span className="logo__red" onClick={handleClick}>
          My
        </span>
        <span className="logo__black" onClick={handleClick}>
          News
        </span>
      </div>

      {onHamburgerClick && (
        <button className="hamburger-btn" onClick={onHamburgerClick}>
          <img
            src={isMenuOpen ? "/src/assets/x.svg" : "/src/assets/Hamburger.png"}
            alt={isMenuOpen ? "Close" : "Menu"}
          />
        </button>
      )}
    </>
  );
};

export default Logo;
