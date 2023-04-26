import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./comment-box.styles.scss";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <form className="">
        <div className="">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className=""
          />
        </div>
      </form>
      {!userId ? (
        <Fragment>
          <h5>Please login or Create an account to post comment</h5>
          <button className="" onClick={() => navigate("/auth")}>
            Login
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button className="" type="" onClick={handleComment}>
            Post Comment
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CommentBox;
