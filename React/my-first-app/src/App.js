import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import $ from 'jquery';


class PopulatePulls extends React.Component {
  render() {
    return(
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>rasied User</th>
          </tr>
          { this.props.data.map( ( item, index ) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" >{item.title}</a></td>
              <td>{item.user.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

class ReposList extends React.Component {
  showPullRequest(i) {
    $.get(i, function(result) {
      this.props.onAction(result)
    }.bind(this));
  };

  render() {
    return (
      <div>
        <table >
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Repo_Name</th>
              <th>Repo_Owner</th>
              <th>Stars</th>
              <th>forks</th>
              <th>Pull Request</th>
            </tr>
            { this.props.repositories.map( ( repo, index ) => (
              <tr key={index}>
                <td>{index}</td>
                <td><a href={repo.html_url} target="_blank">{ repo.name }</a></td>
                <td>{repo.owner.login}</td>
                <td>{repo.stargazers_count}</td>
                <td>{repo.forks}</td>
                <td><button onClick={this.showPullRequest.bind(this,repo.pulls_url.replace('{/number}', "?state=all"))}>Show</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class PullsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      open: [],
      merged: []
    }
  };

  componentWillMount() {
    const _open = [];
    const _merged = [];
    const _all = [];
    this.props.pullrequestlist.map(function(pullReq,i) {
      _all.push(pullReq);
      if(pullReq.state === "open"){
        _open.push(pullReq);
      }else{
        _merged.push(pullReq);
      }
    })
    this.setState({
        all: _all,
        open: _open,
        merged: _merged
    });
  };

  render() {
    return(
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Open</Tab>
          <Tab>Merged</Tab>
        </TabList>

        <TabPanel>
          <PopulatePulls data={this.state.all} />
        </TabPanel>

        <TabPanel>
          <PopulatePulls data={this.state.open} />
        </TabPanel>

        <TabPanel>
          <PopulatePulls data={this.state.merged} />
        </TabPanel>

      </Tabs>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.getPullsData = this.getPullsData.bind(this);
    this.state = {
      searchTerm: '',
      tabIndex: 0,
      repos: [],
      source: 'https://api.github.com/search/repositories?q=user%3Akaushikthommandra',
      pull: [],
      pageNumber: 1
    }
  };

  handleChange(e) {
    const repo_input = e.target.value;
    this.setState({ searchTerm: repo_input});
  };

  handlePageChange(e) {
    let page_number = e.target.innerHTML;
    const urlLink = `https://api.github.com/search/repositories?q=${this.state.searchTerm}&sort=stars&order=desc&per_page=20&page=${page_number}`
    $.get(urlLink, function(result) {
      this.setState({
        repos: result.items,
      });
    }.bind(this));
    this.setState({
      pageNumber: page_number,
      source: `https://api.github.com/search/repositories?q=${this.state.searchTerm}&sort=stars&order=desc&per_page=20&page=${page_number}`
    })
  }

  handleClick() {
    const urlLink = `https://api.github.com/search/repositories?q=${this.state.searchTerm}&sort=stars&order=desc&per_page=20&page=${this.state.pageNumber}`
    $.get(urlLink, function(result) {
        this.setState({
          repos: result.items,
        });
     }.bind(this));
  };

  getPullsData(val) {
    this.setState({
      pull: val,
      tabIndex: 1
    });
  };

  render() {
    return (
      <div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
          <TabList>
            <Tab><strong> Repositories </strong></Tab>
            <Tab><strong> Pull Requests </strong></Tab>
          </TabList>
          <TabPanel>
            <div>
              <input type="text"  onChange={this.handleChange.bind(this)} />
              <input type="button" value="search" onClick={this.handleClick.bind(this)} />
              <ReposList repositories={this.state.repos} onAction ={this.getPullsData} />
              <table >
                <tbody>
                  <tr>
                    <td>page No.</td>
                    {[...Array(10)].map( (x, i) => (
                      <td key={i}><button onClick={this.handlePageChange.bind(this)}>{i+1}</button></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <PullsList pullrequestlist = {this.state.pull} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
