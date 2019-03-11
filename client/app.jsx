import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import ResultsList from './resultsList.jsx';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'


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
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand className="mr-auto">Search World History</Navbar.Brand>
          <Form inline className="justify-content-end" onSubmit={this.handleSubmit.bind(this)}>
            <FormControl type="text" className="search" className="mr-sm-2" id="search-item" placeholder="Search..." value={this.state.value} onChange={this.handleSearch.bind(this)} />
            <Button type="submit" variant="outline-light">Search</Button>
          </Form>
        </Navbar>
          <div className="search-list">
            {searchList}
          </div>
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