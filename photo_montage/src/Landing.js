import React , {useState}from "react";
import "./Landing.css";
import background from "./images/Background.jpg";
import axios from 'axios'
// import PropTypes from 'prop-types'

const Landing =  () => {
  const style = {
    backgroundImage: `url(${background})`,
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  const [formData, setFormData] = useState({search: ""})

  const {search} = formData

  const handleChange = (e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit= (e)=>{
      e.preventDefault()
      alert('yay')
  }

  return (
    <div className="Landing" style={style}>
      <div className="LandingContent">
        <div className="">
        <h1>I need some <em>inspiration</em></h1>
        </div>
        <div className="LandingSubHeading">
        <h3>What would you like to see today?</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className='LandingForm'>
                <input type="text" placeholder='Search ....' value={search} name='search' onChange={handleChange}/>
                <button>Inspire me!</button>
                {search}
            </div>

        </form>
      </div>
    </div>
  );
}

// Landing.propTypes = {

// }

export default Landing;
