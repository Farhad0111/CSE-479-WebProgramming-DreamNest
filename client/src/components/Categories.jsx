import { Link } from "react-router-dom";

import { categories } from "../data";
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Our Top Categories</h1>
      <p>
        Explore our wide range of house rentals that cater to all types of
        tenants. Find your comfort home in a reasonable price.
      </p>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link
            to={`/properties/category/${category.label}`}
            key={category.label}
          >
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
