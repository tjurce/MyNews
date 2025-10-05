import { useLocation } from "react-router-dom";
import { type NewsApiArticle } from "../../services/newsService";
import "./Article.scss";
import { useFavorites } from "../../context/useFavorites";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Article = () => {
  const location = useLocation();
  const { article } = location.state as { article: NewsApiArticle };
  const contentWithoutChars = article.content?.replace(/\[\+\d+ chars\]$/, "");

  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = favorites.some((a) => a.url === article.url);

  if (!article) return <div>No article found</div>;

  return (
    <div className="article">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          loading="lazy"
          className="article__image"
        />
      )}
      <div className="article__header">
        <h1 className="article__title">{article.title}</h1>
        <button
          className="article__favorite-btn"
          onClick={() => toggleFavorite(article)}
        >
          {isFavorited ? (
            <AiFillStar size={28} color="#bb1e1e" />
          ) : (
            <AiOutlineStar size={28} color="#bb1e1e" />
          )}
        </button>
      </div>
      <div className="article__author">By {article.author || "Unknown"}</div>
      <div className="article__content">
        {contentWithoutChars || "Full article content will go here."}
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Full article
        </a>
      </div>
    </div>
  );
};

export default Article;
