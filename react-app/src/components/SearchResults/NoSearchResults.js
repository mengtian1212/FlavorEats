import { useHistory } from "react-router-dom";
import "./NoSearchResults.css";

function NoSearchResults({ searchQuery }) {
  const history = useHistory();

  const handleViewAll = () => {
    history.push("/restaurants");
    window.scroll(0, 0);
  };
  return (
    <div className="no-results-container">
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f601b8be1064c30a.svg"
        alt=""
        className="avocado-img"
      />
      <div className="reviews-left-title1">
        We didn't find a match for "{searchQuery}"
      </div>
      <div className="no-results-try">
        Try searching for something else instead
      </div>
      <button className="no-view-all" onClick={handleViewAll}>
        View all
      </button>
    </div>
  );
}

export default NoSearchResults;
