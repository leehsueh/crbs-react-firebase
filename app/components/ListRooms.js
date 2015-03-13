var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CreateRoom = require('./CreateRoom');
var listRoomsStore = require('../stores/listRoomsStore');
var roomActions = require('../actions/roomActions');

var ListRooms = React.createClass({
  getInitialState: function() {
    return {
      rooms: listRoomsStore.getRooms()
    };
  },
  componentDidMount: function() {
    // register with listRoomsStore
    listRoomsStore.addChangeListener(this.handleChange);

    // get initial list of rooms from FB
    roomActions.listRooms();
  },
  componentWillUnmount: function() {
    // unregister
    listRoomsStore.removeChangeListener(this.handleChange);
  },
  handleChange: function() {
    // get list of rooms
    this.setState({
      rooms: listRoomsStore.getRooms()
    });
  },
  render: function(){
    var roomItems = this.state.rooms.map(function(room) {
      return (
        <tr key={room.key}>
          <td style={{width:'80%'}}>{room.name}</td>
          <td style={{width:'20%'}}><Link className="btn btn-primary" to="room" params={{roomKey: room.key}}>Join room</Link></td>
        </tr>
      );
    })
    return (
      <div>
        <h2>Create a room</h2>
        <CreateRoom />

        <h2>Existing Rooms</h2>
        <table className="table">
          <tbody>
            {roomItems}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = ListRooms;