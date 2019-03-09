import React from 'react';
import Result from './result.jsx';

class ResultsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.list
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      this.setState({
        list: this.props.list
      })
    }
  }

  render(){
    console.log('props:', this.props.list)
    return(
      <div>
        {this.state.list.map((item, id) => 
          <Result item={item} key={id}/>
        )}
      </div>
    )
  }
}

export default ResultsList

