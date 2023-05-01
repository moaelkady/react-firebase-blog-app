import Card from "../card/card.component";

import "./related-blog.styles.scss";

const RelatedBlog = ({ blogs, id }) => {
  return (
    <div className="related-blog-container">
      <div className="feature-blogs-heading">Related Blogs</div>
      {blogs.length === 1 && (
        <h5 className="">Related Blogs not found with this current blog</h5>
      )}
      {blogs &&
        blogs
          .filter((blogs) => blogs.id !== id)
          .map((item) => <Card key={id} {...item} />)}
    </div>
  );
};

export default RelatedBlog;
