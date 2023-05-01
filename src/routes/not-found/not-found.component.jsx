import "./not-found.styles.scss";
import { Helmet } from "react-helmet-async";
import { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Oops! We Couldn't Find That Page</title>
        <meta name="description" content="We're sorry, but the page you're looking for can't be found. Explore our homepage for the latest updates and inspiration in moQadi blogs." />
        <meta name="keyword" content="Rank, optimization, seo, traffic" />
      </Helmet>
      <div>
        <h1>Not Found</h1>
      </div>
    </Fragment>
  );
};

export default NotFound;
