import { useNavigate } from "react-router-dom";
import "./NewsItem.scss";

interface NewsItemProps {
  article: {
    source: { name: string };
    author: string | null;
    title: string;
    urlToImage: string | null;
    content?: string | null;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = encodeURIComponent(`${article.title}-${article.source.name}`);
    navigate(`/article/${slug}`, { state: { article } });
  };

  return (
    <div className="board__item" onClick={handleClick}>
      {article.urlToImage && (
        <img
          src={article.urlToImage || ""}
          alt={article.title}
          loading="lazy"
          className="board__image"
        />
      )}
      <div className="board__category">{article.source.name}</div>
      <h3 className="board__title">{article.title}</h3>
      <div className="board__author">{article.author || "Unknown"}</div>
    </div>
  );
};

export default NewsItem;
