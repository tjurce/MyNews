import React, { useState } from "react";
import "./Navbar.scss";

interface NavbarItem {
  icon: string;
  label: string;
}

interface NavbarProps {
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`navbar__item ${
              activeIndex === index ? "navbar__item--active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={item.icon} alt={item.label} className="navbar__icon" />
            <div className="navbar__label">{item.label}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
