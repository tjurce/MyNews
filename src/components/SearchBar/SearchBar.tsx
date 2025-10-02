import { useState } from "react";
import "./SearchBar.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <FaSearch className="search__icon" />
        <input
          type="text"
          className="search__input"
          placeholder="Search news"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search__button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
