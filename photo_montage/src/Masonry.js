import React from "react";

function Masonry(props) {
  const columnWrapper = {};
  const result = [];

  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }
  var colHeight = [0, 0, 0];

  for (let i = 0; i < props.children.length; i++) {
    const minValue = Math.min(...colHeight);
    const findMinValue = element => element === minValue;
    const columnIndex = colHeight.findIndex(findMinValue);
    
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${props.gap}px` }}>{props.children[i]}</div>
    );
    colHeight[columnIndex] =
      colHeight[columnIndex] +
      props.children[i].props.image.height /
        props.children[i].props.image.width;
  }

  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
        key={i}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return <div style={{ display: "flex" }}>{result}</div>;
}

export default Masonry;
