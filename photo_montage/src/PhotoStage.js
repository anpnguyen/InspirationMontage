import React, { useState, useEffect } from "react";
import "./PhotoStage.css";
import axios from "axios";
import IndividualImage from "./IndividualImage";
import InfiniteScroll from "react-infinite-scroll-component";
import uuid from "uuid/v4";
// import PropTypes from 'prop-types'

function PhotoStage(props) {
  const { match } = props;
  const [searchState, setSearchState] = useState({
    page: 1,
    totalPages: undefined,
    images: [],
    loading: true
  });

  const { page, images, loading } = searchState;

  useEffect(() => {
    const getImages = async () => {
      const response = await axios.get(
        `/api/photos?page=${page}&query=${match.params.searchParams}`
      );

      setSearchState({
        ...searchState,
        totalPages: response.data.total_pages,
        images: response.data.results,
        loading: false
      });
    };

    getImages();
  }, []);

  const updatePage = () => {
    setSearchState({ ...searchState, page: page + 1, loading: false });
  };

  useEffect(() => {
    
    const getNewImages = async () => {
      console.log('calling from inside async')
      const newResponse = await axios.get(
        `/api/photos?page=${page}&query=${match.params.searchParams}`
      );
      setSearchState({
        ...searchState,
        images: images.concat(newResponse.data.results)
      });
    };

    images.length > 0 && getNewImages();
    console.log(searchState.images)
  }, [page]);

  const mappedData = images.map(image => {
    
    return <IndividualImage image={image} key={uuid()} />;
  });

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <InfiniteScroll
      dataLength={images.length} //This is important field to render the next data
      next={updatePage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className="PhotoStage">{mappedData}</div>
    </InfiniteScroll>
  );
}

export default PhotoStage;
