import React, { useState, useEffect } from "react";
import "./PhotoStage.css";
import axios from "axios";
// import PropTypes from 'prop-types'

function PhotoStage(props) {

  const {match} = props  
  const [searchState, setSearchState] = useState({
    page: 1,
    totalPages: undefined,
    images: [],
    loading: true
  });

  const { page, images, loading, totalPages } = searchState;
  

   
  
  useEffect( ()=>{

    const getImages = async () =>{
        const response = await axios.get(`/api/photos?page=${page}&query=${match.params.searchParams}`)
        // console.log(response.data)
        console.log(response.data)
        console.log(response.data.results)

        setSearchState({ totalPages: response.data.total_pages, images: response.data.results})
        
        
    }

    getImages()
    
    
  },[])

  const mappedData = images.map(image=> {
      return(
          <p>{image.height}</p>
      )
  })

  return (
    <div className="PhotoStage">
      <h1>this </h1>
      {totalPages}
      <p>
          {mappedData}
      </p>
    </div>
  );
}

export default PhotoStage;
