import { useState, useEffect, Fragment } from "react";
//import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase/firebase.utils";
//import { isEmpty, isNull } from "lodash";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";

import BlogSection from "../../components/blog-section/blog-section.component";
import Loader from "../../components/loader/loader.component";
import Tags from "../../components/tags/tags.component";
import FeatureBlogs from "../../components/feature-blogs/feature-blogs.component";
import Trending from "../../components/trending/trending.component";
//import Search from "../../components/search/search.component";
import Category from "../../components/category/category.component";
import { Helmet } from "react-helmet-async";

import "./home.styles.scss";

/*
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
*/
const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  //const [search, setSearch] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [hide, setHide] = useState(false);
  //const queryString = useQuery();
  //const searchQuery = queryString.get("searchQuery");
  //const location = useLocation();
  const [openTools, setOpenTools] = useState(false);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "posts");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    //setSearch("");
    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalBlogs(list);
        //setPosts(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);

  useEffect(() => {
    getBlogs();
    setHide(false);
  }, []);

  /*
  const handleResetClick = () => {
    setSearch("");
  };
*/
  const getBlogs = async () => {
    const blogRef = collection(db, "posts");
    const firstFour = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setPosts(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  };

  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const blogsData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts((blogs) => [...blogs, ...blogsData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      toast.info("No more blog to display");
      setHide(true);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "posts");
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
    setLoading(false);
  };
  /*
  const searchBlogs = async () => {
    const blogRef = collection(db, "posts");
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      blogRef,
      where("tags", "array-contains", searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const tagSnapshot = await getDocs(searchTagQuery);

    let searchTitleBlogs = [];
    let searchTagBlogs = [];
    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    tagSnapshot.forEach((doc) => {
      searchTagBlogs.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
    setPosts(combinedSearchBlogs);
    setHide(true);
  };
  */

  /*
  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBlogs]);
  */

  if (loading) {
    return <Loader />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this post ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "posts", id));
        toast.success("Post deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  /*
  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      getBlogs();
      setHide(false);
    }
    setSearch(value);
  };
  */

  // category count
  const counts = totalBlogs.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  const handleToolsOpener = () => {
    setOpenTools(!openTools);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Welcome to moqadi blog - Discover and Explore the Best of web development</title>
        <meta name="description" content="Explore the latest and greatest in web development on moQadi blog. Find tips, guides, and inspiration for your next project." />
        <meta name="keyword" content="web, web development, SEO, Rank, Performance" />
      </Helmet>
      <div className="home-route-container">
        <div className="home-carousel">
          <Trending blogs={trendBlogs} />
        </div>
        <hr />
        <div className="ssc-sidebar-controler" onClick={handleToolsOpener}>
          <span>Open categories and other search tools</span>
        </div>
        <div className="home-content">
          <div className="posts-area">
            {/*posts.length === 0 && location.pathname !== "/" && (
            <Fragment>
              <h4>
                No Blog found with search keyword:
                {<strong>{searchQuery}</strong>}
              </h4>
            </Fragment>
          )*/}
            {posts &&
              posts.length > 0 &&
              posts.map((post) => (
                <BlogSection
                  key={post.id}
                  postData={post}
                  user={user}
                  handleDelete={handleDelete}
                />
              ))}
            {!hide && (
              <button className="btn btn-primary" onClick={fetchMore}>
                Load More
              </button>
            )}
          </div>
          <div
            className={
              openTools ? "blog-side-bar mobile-open" : "blog-side-bar"
            }
          >
            <span className="ssc-sidebar-close" onClick={handleToolsOpener}>
              Close Tools
            </span>
            {/*<Search
            handleResetClick={handleResetClick}
            search={search}
            handleChange={handleChange}
          />*/}
            <Category catgBlogsCount={categoryCount} />
            <Tags tags={tags} />
            <FeatureBlogs blogs={posts} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
