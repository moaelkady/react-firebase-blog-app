import DOMPurify from "dompurify";
import "./user-comments.styles.scss";
const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      {msg ? (
        <h4 className="msg">{msg}</h4>
      ) : (
        <div className="comment-container">
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              width="50px"
              height="50px"
            />
          </div>
          <div className="meta-comment">
            <div className="author-date">
              <span className="author">{name}</span>
              <span className="date">{createdAt.toDate().toDateString()}</span>
            </div>
            <p
              className="comment"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComments;
