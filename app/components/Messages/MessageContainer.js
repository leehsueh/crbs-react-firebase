var React = require('react');
var AddMessage = require('./AddMessage');
var MessageList = require('./MessageList');

var messageActions = require('../../actions/messageActions');
var messageStore = require('../../stores/messageStore');
var userStore = require('../../stores/userStore');
var userActions = require('../../actions/userActions');

var MessageContainer = React.createClass({
  propTypes: {
    roomKey: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return messageStore.getState();
  },
  componentDidMount: function() {
    messageStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount: function() {
    messageStore.removeChangeListener(this.handleChange);
  },
  handleChange: function() {
    this.setState(messageStore.getState());
  },
  handleAddMessage: function(message) {
    messageActions.addMessage(this.props.roomKey, userStore.getCurrentUsername(), message);
  },

  render: function() {
    return (
      <div>
        <AddMessage onAddMessage={this.handleAddMessage} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
});

module.exports = MessageContainer;