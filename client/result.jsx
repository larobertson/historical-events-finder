import React from 'react';

const Result = (props) => {
  return (
  <div className="list-item">
    <div className="location">
      {props.item.category2}
    </div>
    <div className="date">
      {props.item.date}
    </div>
    <div className="description">
      {props.item.description}
    </div>
  </div>
  )
}

export default Result