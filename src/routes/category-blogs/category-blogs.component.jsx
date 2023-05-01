import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogSection from "../../components/blog-section/blog-section.component";
import Loader from "../../components/loader/loader.component";
import { db } from "../../utils/firebase/firebase.utils";
import { Helmet } from "react-helmet-async";

import "./category-blogs.styles.scss";

const CategoryBlogs = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "posts");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(categoryBlogQuery);
    let categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBlogs(categoryBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Discover {category} Blogs on moQadi blog</title>
        <meta name="description" content={`Find top-rated ${category} blogs on moQadi blog. From beginner tips to advanced techniques, we have everything you need to take your skills to the next level.`} />
        <meta name="keyword" content={`${category}, Rank, Performance, Optimization`} />
      </Helmet>
      <div className="category-tag-blogs-route-container">
        <div className="blog-heading">
          <span className="cat-tag-title">Category</span>
          <span className="cat-tag-name">{category.toLocaleUpperCase()}</span>
        </div>
        <div className="posts-area">
          {categoryBlogs &&
            categoryBlogs.map((item) => (
              <BlogSection key={item.id} postData={item} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryBlogs;
