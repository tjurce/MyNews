import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEverything } from "../../services/newsService";
import NewsItem from "../NewsItem/NewsItem";
import "./SearchResults.scss";

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [articles, setArticles] = useState([]);

  const displayQuery = query === "*" ? "all news" : query;

  useEffect(() => {
    if (!query) return;

    const loadSearch = async () => {
      const data = await fetchEverything(query);
      setArticles(data);
    };

    loadSearch();
  }, [query]);

  return (
    <div className="search-results">
      <div className="search-results__title">
        Search results for: {displayQuery}
      </div>
      <div className="search-results__three-col">
        {articles.map((article, i) => (
          <NewsItem key={i} article={article} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
