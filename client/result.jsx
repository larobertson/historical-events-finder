import React from 'react';
import Alert from 'react-bootstrap/Alert';


const Result = (props) => {
  return (
    <Alert variant="dark">
        <div>
          <strong>Location:</strong>
          {props.item.category2}
        </div>
        <div>
          <strong>Date:</strong>
          {props.item.date}
        </div>
        <div>
          {props.item.description}
        </div>
    </Alert>
  )
}

export default Result