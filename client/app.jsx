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
      page: 0,
      pageCount: 0,
      renderResults: false
    }
  }

  getIt () {
    Axios.get('/events', {
      params:{
        q: this.state.value,
        _page: this.state.page,
        _limit: 10
    }})
    .then((results)=> {
      let searchResults = results.data
      let pageCount = Math.ceil(results.headers["x-total-count"]/10)
      this.setState({
        searchResults: searchResults,
        pageCount: pageCount
      })
    })
    .catch((err) => console.log('no good, try again', err))
  }

  handleSearch(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      page: 1
    })
    this.getIt()
  }

  handlePageClick(page) {
    let selected = page.selected + 1
    this.setState({
      page: selected
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchResults !== prevState.searchResults) {
      this.setState({
        renderResults: true
      })
    }
    if (this.state.page !== prevState.page) {
      this.getIt()
    }
  }

  render() {
    let searchList;
    if (this.state.page){
      searchList =  <ResultsList list={this.state.searchResults}/>;
    }

    return (
      <div>
        <h1>Search World History</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" className="search" id="search-item" placeholder="Search..." value={this.state.value} onChange={this.handleSearch.bind(this)}></input>
          <button type="submit" className="searchBtn">Search</button>
        </form>
        {searchList}
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick.bind(this)}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));