var React = require('react');
var Router = require('react-router');
var userStore = require('../../stores/userStore');
var userActions = require('../../actions/userActions');

var Users = React.createClass({
  propTypes: {
    roomKey: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return userStore.getState();
  },
  componentDidMount: function() {
    userStore.addChangeListener(this.handleChange);
    userActions.enterUser(this.props.roomKey, 'anonymous');

  },
  componentWillUnmount: function() {
    userStore.removeChangeListener(this.handleChange);
    userActions.exitUser(this.props.roomKey, this.state.currUser);

  },
  handleChange: function() {
    this.setState(userStore.getState());
  },
  toggleShow: function() {
    this.setState({
      show: !this.state.show
    })
  },
  handleChangeName: function() {
    var newName = prompt('Enter new name');
    userActions.changeName(this.props.roomKey, this.state.currUser, newName);
  },

  render: function(){
    console.log(this.state);
    var userItems = this.state.users.map(function(u) {
      return <li key={u.key} className="list-group-item">{u.name}</li>
    });
    var listGroup;
    if (this.state.show) {
      listGroup = <ul className="list-group">{userItems}</ul>;
    }
    return (
      <div>
        {userStore.getCurrentUsername() && <small>You are <b>{userStore.getCurrentUsername()}</b>. <a onClick={this.handleChangeName}>Change</a></small>}
        <p>{this.state.users.length} users here <a onClick={this.toggleShow} style={{cursor:'pointer'}}>{this.state.show && 'Hide' || 'Show'}</a></p>
        {listGroup}
      </div>
    )
  }
});

module.exports = Users;