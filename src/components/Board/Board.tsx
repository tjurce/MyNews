import { useEffect, useState } from "react";
import {
  fetchTopHeadlines,
  fetchTopHeadlinesByCategory,
  type NewsApiArticle,
} from "../../services/newsService";
import NewsItem from "../NewsItem/NewsItem";
import "./Board.scss";
import { useFavorites } from "../../context/useFavorites";

interface BoardProps {
  categoryTitle: string;
}

const Board: React.FC<BoardProps> = ({ categoryTitle }) => {
  const [articles, setArticles] = useState<NewsApiArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites } = useFavorites();

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      let data: NewsApiArticle[] = [];

      if (categoryTitle === "Home") {
        data = await fetchTopHeadlines();
      } else if (categoryTitle === "Favorites") {
        data = favorites;
      } else {
        data = await fetchTopHeadlinesByCategory(categoryTitle.toLowerCase());
      }
      setArticles(data);
      setLoading(false);
    };
    loadNews();
  }, [categoryTitle]);

  const firstFour = articles.slice(0, 4);
  const rest = articles.slice(4);

  //TODO: check all styles match to figma
  //TODO: remove loading?
  return (
    <div className="board">
      <span className="board__title">
        {categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}
        {loading && <span className="board__loading"> (Loading...)</span>}
      </span>

      {!loading && (
        <>
          <div className="board__two-col">
            {firstFour.map((article, index) => (
              <NewsItem key={index} article={article} />
            ))}
          </div>
          <div className="board__three-col">
            {rest.map((article, index) => (
              <NewsItem key={index + 4} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
