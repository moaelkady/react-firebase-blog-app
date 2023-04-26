import { Link } from "react-router-dom";
import { excerpt } from "../../utils/functions/functions";

import "./card.styles.scss";

const Card = ({ title, post, imgUrl, id, likes, comments }) => {
  return (
    <div className="">
      <div className="">
        <img className="" src={imgUrl} alt={title} />
        <div className="">
          <h5 className="">{title}</h5>
          <p className="">{excerpt(post, 25)}</p>
          <div className="">
            <Link to={`/detail/${id}`}>
              <span className="">Read More</span>
            </Link>
            <div>
              <i className="" />
              {likes.length}
              <i className="" />
              {comments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
