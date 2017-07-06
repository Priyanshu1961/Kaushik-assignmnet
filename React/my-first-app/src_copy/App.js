import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class App extends React.Component{

  getInitialState() {
    return {
      searchResults: [],
      pullResults: []
    }
  };

  updateParentComponent(pullResults) {
    this.setState({
      pullResults: pullResults
    });
  };
  showResults(response) {
    this.setState({
      searchResults: response.items
    })
    console.log(response);
  };

  search(URL) {
    fetch(URL)
    .then(data => data.json())
    .then(response => {
      this.showResults(response);
    });
    // $.ajax({
    //   type: "GET",
    //   dataType: 'jsonp',
    //   url: URL,
    //   success: function(response) {
    //     this.showResults(response);
    //   }.bind(this)
    // });
  };

  render() {
    return (
      <div>
        <SearchBox search={this.search} />
        <Results searchResults={this.state.searchResults}
          updateParentComponent = {this.updateParentComponent} />
        <PullRequests pullResults={this.state.pullResults} />
      </div>
    );
  };
}

class SearchBox extends React.Component {

  render() {
    return (
        <div id="search-form_3">
          <input type="text" ref="query" className="search_3" placeholder="Search.." />
          <input type="submit" className="submit_3" value="Search" onClick={this.createAjax} />
        </div>
    );
  };

  createAjax() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var URL = 'https://api.github.com/search/repositories?q=' + query + "&sort=stars&order=desc";
    this.props.search(URL)
  }

}

class Results extends React.Component {
  render() {
    var that = this;
    var resultItems = this.props.searchResults.map(function(result){
      return <ResultItem rep_name={result.name} owner={result.owner.login} stars={result.stargazers_count} forks={result.forks_count} url={result.html_url}
        updateParentComponent={that.props.updateParentComponent} />
    });
    return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Number of Stars</th>
              <th>Number of Forks</th>
              <th>Show Pulls</th>
            </tr>
          </thead>
          <tbody>
            {resultItems}
          </tbody>
        </table>
    );
  }
}

class ResultItem extends React.Component {
  render() {
    return (
      <tr>
        <td><a href={this.props.url}>{this.props.rep_name}</a></td>
        <td>{this.props.owner}</td>
        <td>{this.props.stars}</td>
        <td>{this.props.forks}</td>
        <td><button type="button" className = "button" onClick={this.createPull}>Show Pulls</button></td>
      </tr>
    );
  };

  createPull() {
    console.log("function call happend")
    var owner = this.props.owner
    var name = this.props.rep_name
    var url = 'https://api.github.com/repos/' + owner + '/' + name +'/pulls'
    console.log("Url" + url)
    this.find_pull(url)
  };

  find_pull(url) {
    console.log("in showPullRequests method")
    // $.ajax({
    //   type: "GET",
    //   dataType: 'jsonp',
    //   url: url,
    //   success: function(response) {
    //     console.log("response" + response)
    //     this.showPullRequests(response);
    //   }.bind(this)
    // });
  };

  showPullRequests(response) {
    console.log("in showPullRequests method")
    this.props.updateParentComponent(response.data);
    console.log(response);
  };
}

class PullRequests extends React.Component {

  render() {
    var pullResults = this.props.pullResults.map(function(result){
      return <li>{result.url}</li>
    });
    console.log("hello")
    console.log(pullResults)
    return (
        <div>
          <ul>
            {pullResults}
          </ul>
        </div>
    );
  };

}

export default App;
