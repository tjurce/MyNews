interface NewsItemProps {
  article: {
    source: { name: string };
    author: string | null;
    title: string;
    urlToImage: string | null;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  return (
    <div className="board__item">
      <img
        src={article.urlToImage || ""}
        alt={article.title}
        className="board__image"
      />
      <div className="board__category">{article.source.name}</div>
      <h3 className="board__title">{article.title}</h3>
      <div className="board__author">By {article.author || "Unknown"}</div>
    </div>
  );
};

export default NewsItem;
