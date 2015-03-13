var React = require('react');
var Main = require('../components/Main');
var ListRooms = require('../components/ListRooms');
var Room = require('../components/Room');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="room" path="room/:roomKey" handler={Room} />
    <DefaultRoute handler={ListRooms} />
  </Route>
);