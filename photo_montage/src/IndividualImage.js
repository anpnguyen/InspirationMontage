import React, { Fragment } from "react";

function IndividualImage(props) {
  const { image } = props;

  return (
    <Fragment>
      <div className="IndividualImage">
        <img src={image.urls.small} alt={image.description} onLoad={()=>console.log('loaded')}/>
      </div>
    </Fragment>
  );
}

export default IndividualImage;
