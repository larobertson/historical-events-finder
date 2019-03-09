import React from 'react';

const Result = (props) => {
  return (
    <div>
    <div>
      {props.item.category2}
    </div>
    <div>
      {props.item.date}
    </div>
    <div>
      {props.item.description}
    </div>
  </div>
  )
}

export default Result