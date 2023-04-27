import { Fragment } from "react";
import { Link } from "react-router-dom";

import "./tags.styles.scss";

const Tags = ({ tags }) => {
  return (
    <Fragment>
      <div className="tags-heading">Tags</div>
      <div className="tags-container">
        {tags &&
          tags.map((tag, index) => (
            <p className="tag" key={index}>
              <Link to={`/tag/${tag}`}>{tag}</Link>
            </p>
          ))}
      </div>
    </Fragment>
  );
};

export default Tags;
