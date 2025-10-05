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
  const { favorites } = useFavorites();

  useEffect(() => {
    const loadNews = async () => {
      let data: NewsApiArticle[] = [];
      if (categoryTitle === "Home") data = await fetchTopHeadlines();
      else if (categoryTitle === "Favorites") data = favorites;
      else
        data = await fetchTopHeadlinesByCategory(categoryTitle.toLowerCase());
      setArticles(data);
    };
    loadNews();
  }, [categoryTitle]);

  const firstFour = articles.slice(0, 4);
  const rest = articles.slice(4);

  return (
    <div className="board">
      <span className="board__category-title">
        {categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}
      </span>
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
    </div>
  );
};

export default Board;
