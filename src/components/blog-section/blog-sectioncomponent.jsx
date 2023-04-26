import { Link } from "react-router-dom";
import { excerpt } from "../../utils/functions/functions";

import "./blog-section.styles.scss";

const BlogSection = ({ postData, user, handleDelete }) => {
  const { id, title, post, tags, category, imgUrl, userId, author, timestamp } =
    postData;

  return (
    <div className="post-top-container">
      <div className="post-container">
        <div className="post-row">
          <div className="post-col">
            <div className="post-title">
              <h2>{title}</h2>
              <span>{category}</span>
            </div>
            <div className="post-description">
              <p>{excerpt(post, 120)}</p>
              <Link to={`/detail/${id}`}>
                <button className="btn-read">Know More</button>
              </Link>
            </div>
          </div>
          <div className="post-col col-right">
            <div
              className="bg-img"
              style={{ backgroundImage: `URL(${imgUrl})` }}
            ></div>
          </div>
        </div>

        <div className="post-row">
          <div className="post-col">
            <div className="tags">
              {tags.map((tag) => (
                <span className="tag-name" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="post-col author-time-box">
            <span className="author-name">Author : {author.split(" ")[0]}</span>
            <span className="time">{timestamp.toDate().toDateString()}</span>
          </div>
        </div>
      </div>
      {user && user.uid === userId && (
        <div className="post-controls-container">
          <span onClick={() => handleDelete(id)}>Delete</span>&nbsp;||&nbsp;
          <Link to={`/update/${id}`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
