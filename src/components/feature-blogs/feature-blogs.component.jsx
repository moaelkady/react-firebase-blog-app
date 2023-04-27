import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./feature-blogs.styles.scss";

const FeatureBlogs = ({ blogs }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="feature-blogs-heading">Most Popular</div>
      {blogs &&
        blogs.map((item) => (
          <div
            className="feature-blog-item"
            key={item.id}
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            <div className="bg-img-container">
              <div
                className="bg-img"
                style={{ backgroundImage: `URL(${item.imgUrl})` }}
              ></div>
            </div>
            <div className="description-container">
              <div className="title">{item.title}</div>
              <div className="time-shared">
                {item.timestamp.toDate().toDateString()}
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default FeatureBlogs;
