import React, { useState, useEffect, Fragment } from "react";
import DOMPurify from "dompurify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentBox from "../../components/comment-box/comment-box.component";
import FeatureBlogs from "../../components/feature-blogs/feature-blogs.component";
import RelatedBlog from "../../components/related-blog/related-blog.component";
import Tags from "../../components/tags/tags.component";
import UserComments from "../../components/user-comments/user-comments.component";
import { db } from "../../utils/firebase/firebase.utils";
import Loader from "../../components/loader/loader.component";
import { Helmet } from "react-helmet-async";

import "./details.styles.scss";

const Details = ({ user }) => {
  const userId = user && user.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "posts");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "posts");
    const docRef = doc(db, "posts", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
    setBlog(blogDetail.data());
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
    );
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlogs(relatedBlogs);
    setLoading(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user && user.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "posts", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  console.log(blog);

  return (
    <Fragment>
      <Helmet>
        <title>{blog && blog.title}</title>
        <meta name="description" content={blog && blog.metaDescription} />
        <meta name="keyword" content={blog && blog.tags.map((tag) => tag)} />
      </Helmet>
      <div className="post-details-route">
        <div
          className="post-title-box"
          style={{
            backgroundImage: `url('${blog && blog.imgUrl}')`,
            height: `${window.innerHeight - 80}px`,
          }}
        >
          <div className="overlay"></div>
          <div className="post-title">
            <span>{blog && blog.timestamp.toDate().toDateString()}</span>
            <div className="author">
              <h2>{blog && blog.title}</h2>
              <p>By {blog && blog.author}</p>
            </div>
          </div>
        </div>
        <div className="post-body-container">
          <div className="post-details">
            <div className="post-content">
              <Link to="/">
                <span className="arrow">&#8617;</span>Go Back To Home Page
              </Link>
              {blog && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.post),
                  }}
                />
              )}
              <Link to="/">
                <span className="arrow">&#8617;</span>Go Back To Home Page
              </Link>
            </div>
            <div className="post-tags">
              <Tags tags={blog && blog.tags} />
            </div>
            <div className="comment-box">
              <div className="comments">
                <h4 className="small-title">
                  {comments && comments.length} Comment
                </h4>
                {isEmpty(comments) ? (
                  <UserComments
                    msg={"No Comments yet. Be the first to comment!"}
                  />
                ) : (
                  <Fragment>
                    {comments &&
                      comments.map((comment) => (
                        <UserComments
                          key={comment.createdAt.seconds}
                          {...comment}
                        />
                      ))}
                  </Fragment>
                )}
              </div>
            </div>
            <CommentBox
              userId={userId}
              userComment={userComment}
              setUserComment={setUserComment}
              handleComment={handleComment}
            />
          </div>
          <div className="post-side-bar">
            <Tags tags={tags} />
            <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
            <RelatedBlog id={id} blogs={relatedBlogs} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Details;
