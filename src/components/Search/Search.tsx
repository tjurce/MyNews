import "./Search.scss";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="search">
      <div className="search__wrapper">
        <FaSearch className="search__icon" />
        <input
          type="text"
          className="search__input"
          placeholder="Search news"
        />
        <button className="search__button">Search</button>
      </div>
    </div>
  );
};

export default Search;
