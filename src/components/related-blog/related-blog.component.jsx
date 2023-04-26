import Card from "../card/card.component";

import "./related-blog.styles.scss";

const RelatedBlog = ({ blogs, id }) => {
  return (
    <div className="related-blog-container">
      <div className="">Related Blogs</div>
      <div className="">
        <div className="">
          {blogs.length === 1 && (
            <h5 className="">Related Blogs not found with this current blog</h5>
          )}
          {blogs &&
            blogs
              .filter((blogs) => blogs.id !== id)
              .map((item) => <Card {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default RelatedBlog;
