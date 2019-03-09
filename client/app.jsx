import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import ResultsList from './resultsList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: [],
      renderResults: false
    }
  }

  handleSearch(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('is this the text?', this.state.value);
    Axios.get(`/search?q=${this.state.value}`)
    .then((results)=> {
      let searchResults = results.data
      console.log('results!', results.data)
      this.setState({
        searchResults: searchResults
      })
    })
    .catch((err) => console.log('no good, try again', err)) 
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchResults !== prevState.searchResults) {
      this.setState({
        renderResults: true
      })
      console.log('state changed')
    } 
  }

  render() {
    let searchList;
    if (this.state.renderResults){
      searchList =  <ResultsList list={this.state.searchResults}/>;
    }

    return (
      <div>
        <h1>Hello World!</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" className="search" id="search-item" placeholder="Search..." value={this.state.value} onChange={this.handleSearch.bind(this)}></input>
          <button type="submit" className="searchBtn">Search</button>
        </form>
        {searchList}
        <ReactPaginate/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));