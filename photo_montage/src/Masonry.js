import React from "react";
import uuid from "uuid/v4";

function Masonry(props) {
  const { children, gap, columns } = props;
  const individualColumn = {};
  const fullColumns = [];

  for (let i = 0; i < columns; i++) {
    individualColumn[`column${i}`] = [];
  }

  var colHeight = [];
  for (let i = 0; i < columns; i++) {
    colHeight.push(0);
  }

  for (let i = 0; i < children.length; i++) {
    const minValue = Math.min(...colHeight);
    const findMinValue = element => element === minValue;
    const columnIndex = colHeight.findIndex(findMinValue);

    individualColumn[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }} key={uuid()}>
        {children[i]}
      </div>
    );
    colHeight[columnIndex] =
      colHeight[columnIndex] +
      children[i].props.image.height / children[i].props.image.width;
  }

  for (let i = 0; i < columns; i++) {
    fullColumns.push(
      <div
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
        key={i}
      >
        {individualColumn[`column${i}`]}
      </div>
    );
  }

  return <div style={{ display: "flex"}}>{fullColumns}</div>;
}

export default Masonry;
