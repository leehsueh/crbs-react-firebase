var React = require('react');
var githubActions = require('../../actions/githubActions');
var githubStore = require('../../stores/githubStore');

var Left = React.createClass({
  getInitialState: function() {
    return {
      user: githubStore.getUser(),
      bio: githubStore.getBio(),
    };
  },

  componentWillMount: function() {
    githubStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount: function() {
    githubStore.removeChangeListener(this.handleChange);
  },

  componentDidMount: function() {
    githubActions.changeUser(this.props.username);
    githubActions.getUserBio(this.props.username);
  },

  componentWillReceiveProps: function(nextProps) {
    // this gets invoked when the route changes and
    // props that have changed propagate to this component
    githubActions.changeUser(nextProps.username);
    githubActions.getUserBio(nextProps.username);
  },

  handleChange: function() {
    this.setState({
      user: githubStore.getUser(),
      bio: githubStore.getBio(),
    })
  },

  render: function() {

    return (
      <div>
        <h3>{this.state.user}{"'"}s Profile</h3>
        <ul className="list-group">
          {this.state.bio.avatar_url && <li className="list-group-item"> <img src={this.state.bio.avatar_url} className="img-rounded img-responsive"/> </li>}
          {this.state.bio.name && <li className="list-group-item"> Name: {this.state.bio.name} </li>}
          {this.state.bio.login && <li className="list-group-item"> Username: {this.state.bio.login} </li>}
          {this.state.bio.email && <li className="list-group-item"> Email: {this.state.bio.email} </li>}
          {this.state.bio.location && <li className="list-group-item"> Location: {this.state.bio.location} </li>}
          {this.state.bio.company && <li className="list-group-item"> Company: {this.state.bio.company} </li>}
          {this.state.bio.followers && <li className="list-group-item"> Followers: {this.state.bio.followers} </li>}
          {this.state.bio.following && <li className="list-group-item"> Following: {this.state.bio.following} </li>}
          {this.state.bio.following && <li className="list-group-item"> Public Repos: {this.state.bio.public_repos} </li>}
          {this.state.bio.blog && <li className="list-group-item"> Blog: <a href={this.state.bio.blog}> {this.state.bio.blog} </a></li>}
        </ul>
      </div>
    );
  }
})

module.exports = Left;