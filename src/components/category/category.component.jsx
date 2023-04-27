import { Link } from "react-router-dom";
import "./category.styles.scss";

const Category = ({ catgBlogsCount }) => {
  return (
    <div className="category-widget">
      <div className="category-heading">Category</div>
      <div className="category-link-widget">
        <ul>
          {catgBlogsCount &&
            catgBlogsCount.map((item, index) => (
              <li key={index}>
                <Link to={`/category/${item.category}`}>
                  {item.category}
                  <span>({item.count})</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
