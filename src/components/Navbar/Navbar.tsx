import React, { useEffect } from "react";
import "./Navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: "/src/assets/Home.svg", label: "Home" },
  { icon: "/src/assets/General.svg", label: "General" },
  { icon: "/src/assets/Business.svg", label: "Business" },
  { icon: "/src/assets/Health.svg", label: "Health" },
  { icon: "/src/assets/Science.svg", label: "Science" },
  { icon: "/src/assets/Sports.svg", label: "Sports" },
  { icon: "/src/assets/Technology.svg", label: "Technology" },
  { icon: "/src/assets/Star.svg", label: "Favorites" },
];

interface NavbarProps {
  onSelectCategory: (category: string) => void;
  isOpen?: boolean; // only used in mobile
}

const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  isOpen = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleCategoryChange = (index: number, label: string) => {
    setActiveIndex(index);
    onSelectCategory(label);
    navigate("/");
  };

  // Reset activeIndex to 0 (Home) when user is on "/"
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveIndex(0);
    }
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isOpen ? "navbar--mobile-open" : ""}`}>
      <ul className="navbar__list">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`navbar__item ${
              activeIndex === index ? "navbar__item--active" : ""
            }`}
            onClick={() => handleCategoryChange(index, item.label)}
          >
            <img src={item.icon} alt={item.label} className="navbar__icon" />
            <span className="navbar__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
