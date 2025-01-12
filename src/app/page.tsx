import ArticleGrid from "./components/ArticleGrid";
import CategoriesSection from "./components/CategoriesSection";
import HeroSection from "./components/HeroSection";

const Homepage = () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <CategoriesSection />
      <ArticleGrid />
    </div>
  );
};

export default Homepage;