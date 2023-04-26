import React from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="">Search</div>
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            value={search}
            className=""
            placeholder="Search blog"
            onChange={handleChange}
          />
        </div>
        <button className="">searchIcon</button>
      </form>
    </div>
  );
};

export default Search;
