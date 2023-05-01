import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import BlogSection from "../../components/blog-section/blog-section.component";
import Loader from "../../components/loader/loader.component";
import { Helmet } from "react-helmet-async";

const TagBlogs = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();

  const getTagBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "posts");
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));
    const docSnapshot = await getDocs(tagBlogQuery);
    let tagBlogs = [];
    docSnapshot.forEach((doc) => {
      tagBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTagBlogs(tagBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getTagBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          Explore {tag} Blogs on moQadi blogs - Your Ultimate Source for web and
          freelancing
        </title>
        <meta
          name="description"
          content={`Browse ${tag} blogs on moQadi blogs and stay up-to-date with the latest news, trends, and techniques in web development and freelancing.`}
        />
        <meta name="keyword" content="Rank, SEO, Performance, Optimization" />
      </Helmet>
      <div className="category-tag-blogs-route-container">
        <div className="blog-heading">
          <span className="cat-tag-title">Tag</span>
          <span className="cat-tag-name">{tag.toLocaleUpperCase()}</span>
        </div>
        <div className="posts-area">
          {tagBlogs &&
            tagBlogs.map((item) => (
              <BlogSection key={item.id} postData={item} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TagBlogs;
