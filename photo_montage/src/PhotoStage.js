import React, { useState, useEffect, Fragment } from "react";
import "./PhotoStage.css";
import axios from "axios";
import {Link} from 'react-router-dom'
import IndividualImage from "./IndividualImage";
import InfiniteScroll from "react-infinite-scroll-component";
import uuid from "uuid/v4";
import Masonry from "./Masonry";
import Spinner from "./Spinner";

function PhotoStage(props) {
  const { match, history, errorMessage } = props;

  const [searchState, setSearchState] = useState({
    page: 1,
    totalPages: undefined,
    images: [],
    loading: true
  });

  const [colNumber, setColNumber] = useState(3);

  const { page, images, loading, totalPages } = searchState;

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
      if (response.data.total === 0) {
        errorMessage(
          `No images were found for ${
            match.params.searchParams
          }`
        );
        history.push("/");
      }
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
      console.log("calling");
    };

    images.length > 0 && page < totalPages && getNewImages();
  }, [page]);

  const mappedData = images.map(image => {
    return <IndividualImage image={image} key={uuid()} />;
  });

  if (images.length > 0 && images.length < 10) {
    errorMessage(
      `No images were found for ${
        match.params.searchParams
      }`
    );
    history.goBack();
  }

  useEffect(() => {
    const colResize = () => {
      if (document.documentElement.clientWidth < 698) {
        setColNumber(2);
      }
      if (document.documentElement.clientWidth <= 480) {
        setColNumber(1);
      }
      if (document.documentElement.clientWidth >= 698) {
        setColNumber(3);
      }
    };
    colResize();
    window.addEventListener("resize", colResize);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="goBack">
        <div className="goBackButtons">
          <Link exact to='/'>Back</Link>  
        </div>
      </div>
    <InfiniteScroll
      dataLength={images.length}
      next={updatePage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Masonry columns={colNumber} gap={0}>
        {mappedData}
      </Masonry>
    </InfiniteScroll>
    </Fragment>
  );
}

export default PhotoStage;
