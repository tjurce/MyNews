import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEverything } from "../../services/newsService";
import NewsItem from "../NewsItem/NewsItem";
import "./SearchResults.scss";

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!query) return;
    const loadSearch = async () => {
      const data = await fetchEverything(query.toLowerCase());
      //TODO: Filter results that have query only in title
      /*       const filtered = data.filter((a: { title: string }) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      ); */
      setArticles(data);
    };
    loadSearch();
  }, [query]);

  if (!articles.length) return <div>No results for "{query}"</div>;

  return (
    <div className="search-results">
      <div className="search-results__title">Search results for: {query}</div>
      <div className="search-results__three-col">
        {articles.map((article, i) => (
          <NewsItem key={i} article={article} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
