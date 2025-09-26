const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (category: string = "general") => {
    try {
        const response = await fetch(
            `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
