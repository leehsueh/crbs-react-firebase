var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
  messages: [],

}

// private setters
var setMessages = function(messages) {
  _state.messages = messages || [];
};

var messageStore = objectAssign({}, EventEmitter.prototype, {
  // let components register for changes
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // store read-only API
  getState: function() {
    return _state;
  },
});

messageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case appConstants.actionTypes.UPDATE_MESSAGES:
      setMessages(action.data);
      messageStore.emit(CHANGE_EVENT);
      console.log('messageStore: ' + action.type);
      break;

    default:
      return true;
  }
})

module.exports = messageStore;
