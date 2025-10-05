import { useEffect, useState, useRef, useCallback } from "react";
import {
  fetchRecentNews,
  type NewsApiArticle,
} from "../../services/newsService";
import "./NewsBox.scss";
import { useNavigate } from "react-router-dom";

const NewsBox = () => {
  const [articles, setArticles] = useState<NewsApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/search/*");
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const recent = await fetchRecentNews(page);

      if (recent.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...recent]);
      }
      setLoading(false);
    };
    loadNews();
  }, [page]);

  return (
    <div className="newsbox">
      <div className="newsbox__content">
        <div className="newsbox__title">
          <div className="newsbox__icon">
            <img
              src="/src/assets/OuterOval.png"
              alt="Outer oval"
              className="outer"
            />
            <img
              src="/src/assets/InteriorOval.png"
              alt="Interior oval"
              className="inner"
            />
          </div>
          <span>Latest News</span>
        </div>

        {articles.map((article, index) => {
          const content = (
            <>
              <div className="newsbox__time">
                {new Date(article.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
              <div className="newsbox__article">{article.title}</div>
            </>
          );

          if (index === articles.length - 1) {
            return (
              <div key={index} ref={lastArticleRef} className="newsbox__item">
                {content}
              </div>
            );
          }
          return (
            <div key={index} className="newsbox__item">
              {content}
            </div>
          );
        })}

        {loading && <p>Loading more news...</p>}
        {!hasMore && <p>No more news available</p>}
      </div>

      <div className="newsbox__footer" onClick={handleSeeAll}>
        <span>See all news</span>
        <img
          className="newsbox__footer-arrow"
          src="/src/assets/Arrow.svg"
          alt="arrow"
        ></img>
      </div>
    </div>
  );
};

export default NewsBox;
