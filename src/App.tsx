import "./App.scss";
import Board from "./components/Board/Board";
import Divider from "./components/Divider/Divider";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Navbar from "./components/Navbar/Navbar";
import NewsBox from "./components/NewsBox/NewsBox";
import Search from "./components/Search/Search";

const navItems = [
  { icon: "/src/assets/Home.svg", label: "Home" },
  { icon: "/src/assets/General.svg", label: "General" },
  { icon: "/src/assets/Business.svg", label: "Business" },
  { icon: "/src/assets/Health.svg", label: "Health" },
  { icon: "/src/assets/Science.svg", label: "Science" },
  { icon: "/src/assets/Sports.svg", label: "Sports" },
  { icon: "/src/assets/Technology.svg", label: "Technology" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sampleNews = [
  {
    image: "/src/assets/news.jpg",
    category: "Business",
    title: "Stock market reaches new highs",
    author: "John Doe",
    id: 1,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Health",
    title: "New fitness trend taking over",
    author: "Jane Smith",
    id: 2,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Business",
    title: "Stock market reaches new highs",
    author: "John Doe",
    id: 3,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Health",
    title: "New fitness trend taking over",
    author: "Jane Smith",
    id: 4,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Business",
    title: "Stock market reaches new highs",
    author: "John Doe",
    id: 5,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Health",
    title: "New fitness trend taking over",
    author: "Jane Smith",
    id: 6,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Business",
    title: "Stock market reaches new highs",
    author: "John Doe",
    id: 7,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Health",
    title: "New fitness trend taking over",
    author: "Jane Smith",
    id: 8,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Business",
    title: "Stock market reaches new highs",
    author: "John Doe",
    id: 9,
  },
  {
    image: "/src/assets/news.jpg",
    category: "Health",
    title: "New fitness trend taking over",
    author: "Jane Smith",
    id: 10,
  },
];

//TODO: change icon
//TODO: check font

function App() {
  return (
    <div className="app-container">
      <Header />
      <Logo />
      <Search />
      <Divider width="1095px" height="1px" color="#979797" />
      <Navbar items={navItems} />
      <NewsBox />
      <Board categoryTitle={"sports"} />
    </div>
  );
}

export default App;
