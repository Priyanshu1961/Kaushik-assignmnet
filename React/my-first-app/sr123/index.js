import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import App from './App.js'

let searchTerm;
let pullLink;
let pullurl;
let pulls = [];

class Pulls extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          {  pulls.map( ( item, index ) => (
            <tr key={ index }>
              <td>
                <a href = {item.html_url}>{ item.title }</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}



          class PullUrl extends React.Component {
            constructor(props) {
              super(props);
              this.onClick = this.onClick.bind(this);
              pullurl = props.link.replace('{/number}', "");
            }

            render () {
              return(
                <td>
                  <button id={pullurl} onClick={this.onClick.bind(null, pullurl)} type="button" >show</button>
                </td>
              )
            }

            onClick(link) {

              pulls = []
              console.log(link);
              fetch(link)
              .then(data => data.json())
              .then(response => {pulls = response});
              .then(console.log(pulls));
              ReactDOM.render(
                <Pulls />,
                document.getElementById('blah')
              )
            }
          }


          class SearchBox extends React.Component {
            constructor(props) {
              super(props);
              this.onClick = this.onClick.bind(this);
              this.state = { repositories: [] };
            }
            render() {
              return(
                <Tabs defaultIndex={0}>
                  <TabList>
                    <Tab>Repositories</Tab>
                    <Tab>Pull Requests</Tab>
                  </TabList>
                  <TabPanel>
                    <div>
                      <form>
                        <input type="text" className="searchbox"  ref={(input) => { this.searchBox = input; }}/>
                        <button onClick={this.onClick}>Search</button>
                      </form>
                      <div className="foundRepo">{this.props.name}</div>
                      <h2>Repositories</h2>
                      <table >
                        <tbody>
                          <tr>
                            <th>Repo Name</th>
                            <th>User</th>
                            <th>Stars</th>
                            <th>Forks</th>
                            <th>Pull Requests</th>
                          </tr>
                          { this.state.repositories.map( ( item, index ) => (
                            <tr key={ index }>
                              <td>
                                <a href = {item.html_url}>{ item.name }</a>
                              </td>
                              <td>
                                { item.owner.login }
                              </td>
                              <td>
                                { item.stargazers_count }
                              </td>
                              <td>
                                { item.forks_count }
                              </td>
                              <PullUrl link={item.pulls_url}/>
                            </tr>
                          )) }
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <Tabs defaultIndex={0}>
                      <TabList>
                        <Tab>All</Tab>
                        <Tab>Open</Tab>
                        <Tab>Closed</Tab>
                      </TabList>
                      <TabPanel>All the pull requests</TabPanel>
                      <TabPanel>O pull requests</TabPanel>
                      <TabPanel>All the pull requests</TabPanel>
                    </Tabs>
                  </TabPanel>
                </Tabs>
    );
  }
  myFunction(event) {
    console.log('testing');
    console.log(this);
    pullLink = this.props.name;
    console.log(pullLink);
    event.preventDefault();
  }

  onClick(event) {
    searchTerm = this.searchBox.value;
    let link = 'https://api.github.com/search/repositories?q=' + searchTerm + '&sort=stars&order=desc';
    console.log(link);
    fetch(link)
    .then(data => data.json())
    .then(response => {
      this.setState({ repositories: response.items });
    });
    event.preventDefault();
  }
}



ReactDOM.render (
  <SearchBox />,
  document.getElementById("root")
)
