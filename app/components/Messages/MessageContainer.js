var React = require('react');
var AddMessage = require('./AddMessage');
var MessageList = require('./MessageList');

var MessageContainer = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <AddMessage />
        <MessageList />
      </div>
    );
  }
});

module.exports = MessageContainer;