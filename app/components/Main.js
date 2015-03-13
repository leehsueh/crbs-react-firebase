var React = require('react');
var ListRooms = require('./ListRooms');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var CreateRoom = require('./CreateRoom');

var Main = React.createClass({
  render: function(){
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="navbar-brand">Bible Study Rooms</div>
          <ul className="nav navbar-nav">
            <li><Link to="app">Home</Link></li>
          </ul>
        </nav>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;