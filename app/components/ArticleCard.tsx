import { Article } from "@/types";
import { ArrowRight } from "lucide-react";

// interface Article {
//   image: string;
//   title: string;
//   category: string;
//   excerpt: string;
//   date: string;
//   slug: string;
// }

const ArticleCard = ({ article }: { article: Article }) => (
    <article className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex-grow">
        <span className="text-sm text-emerald-600 font-medium">{article.categories[0]}</span>
        <h3 className="text-xl font-bold mt-2 mb-3">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.content}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-500">{article.createdAt?.toLocaleDateString()}</span>
          <button className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );

  export default ArticleCard;