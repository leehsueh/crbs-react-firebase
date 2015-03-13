var React = require('react');
var githubActions = require('../../actions/githubActions');
var githubStore = require('../../stores/githubStore');

var Middle = React.createClass({
  getInitialState: function() {
    return {
      repos: githubStore.getRepos()
    };
  },

  componentWillMount: function() {
    githubStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount: function() {
    githubStore.removeChangeListener(this.handleChange);
  },

  componentDidMount: function() {
    githubActions.getUserRepos(this.props.username);
  },

  componentWillReceiveProps: function(nextProps) {
    // this gets invoked when the route changes and
    // props that have changed propagate to this component
    githubActions.getUserRepos(nextProps.username);
  },

  handleChange: function() {
    this.setState({
      repos: githubStore.getRepos()
    })
  },

  render: function() {
    var repoItems = this.state.repos.map(function(repo, index) {
      return (
        <div className="list-group-item" key={index}>
          <h4><a href={repo.html_url}>{repo.name}</a></h4>
          <p>{repo.description}</p>
        </div>
      )
    });
    return (
      <div>
        <h3>Repositories</h3>
        <div className="list-group">
          {repoItems}
        </div>
      </div>
    );
  }
})

module.exports = Middle;