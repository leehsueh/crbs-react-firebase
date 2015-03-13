var React = require('react');
var Passages = require('./Room/Passages');
var Router = require('react-router');
var roomStore = require('../stores/roomStore');
var roomActions = require('../actions/roomActions');

var Room = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return roomStore.getState();
  },
  componentDidMount: function() {
    roomStore.addChangeListener(this.handleChange);
    roomActions.changeRoom(this.getParams().roomKey);
  },
  componentWillUnmount: function() {
    roomStore.removeChangeListener(this.handleChange);
  },
  handleChange: function() {
    this.setState(roomStore.getState());
  },

  render: function(){
    return (
      <div>
        <h2>{this.state.room.name}</h2>
        <div className="row">
          <div className="col-md-8">
            <h3>Passages</h3>
            <Passages roomKey={this.getParams().roomKey} passages={this.state.room.passages} />
          </div>
          <div className="col-md-4">
            <h3>Messages</h3>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Room;