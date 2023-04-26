import { useNavigate } from "react-router-dom";

import "./feature-blogs.styles.scss";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="blog-heading">{title}</div>
      {blogs &&
        blogs.map((item) => (
          <div
            className="row"
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            <div className="">
              <img src={item.imgUrl} alt={item.title} width="200px" height="200px" className="" />
            </div>
            <div className="">
              <div className="">{item.title}</div>
              <div className="">{item.timestamp.toDate().toDateString()}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeatureBlogs;
