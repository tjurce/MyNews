const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/top-headlines?sortBy=publishedAt&country=us&apiKey=${API_KEY}`
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

export const fetchTopHeadlinesByCategory = async (category: string = "general") => {
    try {
        const response = await fetch(
            `${BASE_URL}/top-headlines?sortBy=publishedAt&category=${category}&apiKey=${API_KEY}`
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

export const fetchEverything = async (query: string) => {
    if (query !== "*") {
        const res = await fetch(
            `${BASE_URL}/everything?q=${encodeURIComponent(
                query
            )}&apiKey=${API_KEY}&pageSize=50`
        );
        const data = await res.json();
        return data.articles;
    }
    else {
        const res = await fetch(
            `${BASE_URL}/everything?q=${encodeURIComponent(
                query
            )}&apiKey=${API_KEY}&pageSize=50&sortBy=publishedAt&language=en`
        );
        const data = await res.json();
        return data.articles;
    }
};

export const fetchRecentNews = async (page: number = 1) => {
    const res = await fetch(
        `${BASE_URL}/everything?q=latest&language=en&sortBy=publishedAt&pageSize=20&page=${page}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    return data.articles;
};

export interface NewsApiArticle {
    source: { name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

