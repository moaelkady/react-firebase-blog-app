import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import "./comment-box.styles.scss";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const handleChange = (e) => {
    setUserComment(e.target.value);
  };
  return (
    <Fragment>
      <form className="add-comment-form">
        <textarea
          placeholder="Type a comment or HTML code!"
          value={userComment}
          onChange={handleChange}
        />
      </form>
      {!userId ? (
        <div className="not-user-block">
          <h5>Please login or Create an account to post comment</h5>
          <Link to="/auth" className="add-comment-btn-container">
            <Button btnName="Login || Signup"/>
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="add-comment-btn-container">
            <Button btnName="Comment" onClick={handleComment} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CommentBox;
