import React, { useState, useEffect } from "react";
import "./PhotoStage.css";
import axios from "axios";
import IndividualImage from "./IndividualImage";
import InfiniteScroll from "react-infinite-scroll-component";
import uuid from "uuid/v4";
import Masonry from "./Masonry";
import Spinner from "./Spinner";

function PhotoStage(props) {
  const { match } = props;
  const [loadedCounter, setLoadedCounter] = useState(0);
  const [searchState, setSearchState] = useState({
    page: 1,
    totalPages: undefined,
    images: [],
    loading: true
  });

  const { page, images, loading, totalPages } = searchState;

  useEffect(() => {
    const getImages = async () => {
      const response = await axios.get(
        `/api/photos?page=${page}&query=${match.params.searchParams}`
      );

      setSearchState({
        ...searchState,
        totalPages: response.data.total_pages,
        images: response.data.results
        // loading: false
      });
    };

    getImages();
  }, []);

  const updatePage = () => {
    setSearchState({ ...searchState, page: page + 1, loading: false });
  };

  useEffect(() => {
    const getNewImages = async () => {
      const newResponse = await axios.get(
        `/api/photos?page=${page}&query=${match.params.searchParams}`
      );
      setSearchState({
        ...searchState,
        images: images.concat(newResponse.data.results)
      });
    };

    images.length > 0 && page < totalPages && getNewImages();
  }, [page]);

  const mappedData = images.map(image => {
    return <IndividualImage image={image} key={uuid()} />;
  });

  return loading ? (
    <Spinner />
  ) : (
    <InfiniteScroll
      dataLength={images.length}
      next={updatePage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Masonry columns={3} gap={0}>
        {mappedData}
      </Masonry>
    </InfiniteScroll>
  );
}

export default PhotoStage;
