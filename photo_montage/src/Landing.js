import React, { useState } from "react";
import "./Landing.css";
import background from "./images/Background.jpg";

const Landing = props => {
  const { history } = props;
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  const [formData, setFormData] = useState({ search: "" });

  const { search } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    search && history.push(`/photos/${search}`);
  };

  return (
    <div className="Landing" style={style}>
      <div className="LandingContent">
        <div className="">
          <h1>
            I need some <em>inspiration</em>
          </h1>
        </div>
        <div className="LandingSubHeading">
          <h3>What would you like to see today?</h3>
        </div>
        <div className="LandingForm">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search ...."
              value={search}
              name="search"
              onChange={handleChange}
            />
            <button>Inspire me!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Landing.propTypes = {

// }

export default Landing;
