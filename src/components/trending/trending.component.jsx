import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./trending.styles.scss";

const Trending = ({ blogs, height }) => {
  return (
    <Fragment>
      <div className="carousel-heading-container">
        <h1 className="carousel-heading-title">Trending</h1>
      </div>
      <Carousel
        className="owl-theme"
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        centerMode={false}
        infiniteLoop={true}
        emulateTouch={true}
      >
        {blogs &&
          blogs.map((item) => (
            <div className="item" key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <div className="img-container" style={{height:`${window.innerHeight - 138}px`}}>
                  <div
                    className="bg-img"
                    style={{ backgroundImage: `URL(${item.imgUrl})`,height: `${window.innerHeight - 138}px` }}
                  ></div>
                  {console.log(`${height}`)}
                </div>
                <div className="desc">
                  <span className="title">{item.title}</span>
                  <div className="trending-post-info">
                    <span className="author">{item.author} | </span>
                    <span className="date">
                      {item.timestamp.toDate().toDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </Carousel>
    </Fragment>
  );
};

export default Trending;
