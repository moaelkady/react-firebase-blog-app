import { Link } from "react-router-dom";
import { excerpt } from "../../utils/functions/functions";
import DOMPurify from "dompurify";

import "./card.styles.scss";

const Card = ({ title, post, imgUrl, id, comments }) => {
  return (
    <div className="related-blogs-card-container">
      <div className="bg-img-container">
        <div
          className="bg-img"
          style={{ backgroundImage: `URL(${imgUrl})` }}
        ></div>
      </div>
      <div className="description-container">
        <div className="title">{title}</div>
        <p
          className="content-short"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(excerpt(post, 25)),
          }}
        />
        <Link to={`/detail/${id}`}>
          <span>View Blog &gt;</span>
        </Link>
        <div className="comments">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
          </svg>
          <span className="comments-number">
            {comments.length} {comments.length > 1 ? "Comments" : "comment"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
