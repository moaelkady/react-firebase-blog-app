import { Fragment } from "react";
import "./user-comments.styles.scss";

const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              {msg ? (
                <h4 className="mt-5">{msg}</h4>
              ) : (
                <Fragment>
                  <div className="media-left">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className=""
                    />
                  </div>
                  <div className="">
                    <h3 className="">
                      {name} <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className="">{body}</p>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
