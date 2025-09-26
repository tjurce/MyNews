import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../../services/newsService";
import NewsItem from "../NewsItem/NewsItem";
import "./Board.scss";

interface BoardProps {
  categoryTitle: string;
}

interface NewsApiArticle {
  source: { name: string };
  author: string | null;
  title: string;
  urlToImage: string | null;
}

const Board: React.FC<BoardProps> = ({ categoryTitle }) => {
  const [articles, setArticles] = useState<NewsApiArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data: NewsApiArticle[] = await fetchTopHeadlines(
        categoryTitle.toLowerCase()
      );
      setArticles(data);
      setLoading(false);
    };
    loadNews();
  }, [categoryTitle]);

  if (loading) return <div>Loading {categoryTitle}...</div>;

  const firstFour = articles.slice(0, 4);
  const rest = articles.slice(4);

  //TODO: check all styles match to figma
  return (
    <div className="board">
      <span className="board__title">
        {categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}
      </span>
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
    </div>
  );
};

export default Board;
