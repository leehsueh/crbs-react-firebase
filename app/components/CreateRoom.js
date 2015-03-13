var React = require('react');
var Router = require('react-router');
var roomActions = require('../actions/roomActions');

var CreateRoom = React.createClass({
  mixins: [Router.Navigation],
  handleSubmit: function(e){
    e.preventDefault();
    var roomName = this.refs.roomName.getDOMNode().value;
    this.refs.roomName.getDOMNode().value = '';
    if (roomName.trim().length > 0) {
      roomActions.createRoom(roomName);
    }
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" className="form-control" ref="roomName" placeholder="Name/topic of the room" />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-block btn-primary">Create Room</button>
            </span>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = CreateRoom;