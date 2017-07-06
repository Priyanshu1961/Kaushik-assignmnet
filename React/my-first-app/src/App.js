import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      repos: [],
      source: '',
      all: [],
      open: [],
      merged: [],
      pull: []
    }
  };

  handleChange(e) {
    const repo_input = e.target.value;
    this.setState({ source: "https://api.github.com/search/repositories?q=" + repo_input + "&sort=stars&order=desc" });
  };

  handleClick() {
    $.get(this.state.source, function(result) {
        this.setState({
          repos: result.items,
        });
     }.bind(this));
  };

  segregateRequests() {
    const _open = [];
    const _merged = [];
    const _all = [];
    this.state.pull.map(function(pullReq,i){
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

  showPullRequest(i) {
    this.setState({tabIndex: 1});
    $.get(i, function(result) {
      const request = result;
        this.setState({
          pull: request,
        });
      this.segregateRequests();
    }.bind(this));
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
              <table >
                <tbody>
                  <tr>
                    <th>Repo_Name</th>
                    <th>Repo_Owner</th>
                    <th>Stars</th>
                    <th>forks</th>
                    <th>Pull Request</th>
                  </tr>
                  { this.state.repos.map( ( repo, index ) => (

                    <tr key={index}>
                      <td>
                        <a href={repo.html_url} target="_blank">{ repo.name }</a>
                      </td>
                      <td>
                        { repo.owner.login }
                      </td>
                      <td>
                        { repo.stargazers_count }
                      </td>
                      <td>
                        { repo.forks }
                      </td>
                      <td>
                        <button onClick={this.showPullRequest.bind(this,repo.pulls_url.replace('{/number}', "?state=all"))}>Show</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>All</Tab>
                <Tab>Open</Tab>
                <Tab>Merged</Tab>
              </TabList>
              <TabPanel>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>rasied User</th>
                    </tr>
                    { this.state.all.map( ( item, index ) => (
                      <tr key={index}>
                        <td><a href={item.url} target="_blank" >{item.title}</a></td>
                        <td>{item.user.login}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>rasied User</th>
                    </tr>
                    { this.state.open.map( ( item, index ) => (
                      <tr key={index}>
                        <td><a href={item.url} target="_blank" >{item.title}</a></td>
                        <td>{item.user.login}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>rasied User</th>
                    </tr>
                    { this.state.merged.map( ( item, index ) => (
                      <tr key={index}>
                        <td><a href={item.url} target="_blank" >{item.title}</a></td>
                        <td>{item.user.login}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
// ReactDOM.render(<App  />,document.getElementById('root'))
