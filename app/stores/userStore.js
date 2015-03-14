var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
  users: [],
  currUser: ''
}

// private setters
var setUsers = function(users) {
  _state.users = users || [];
};

var setCurrentUserKey = function(userKey) {
  _state.currUser = userKey;
};

var userStore = objectAssign({}, EventEmitter.prototype, {
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
  getCurrentUsername: function() {
    var user = _state.users.filter(function(u) {
      return u.key === _state.currUser;
    });
    return user[0] && user[0].name || '';
  }
});

userStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case appConstants.actionTypes.UPDATE_USERS:
      setUsers(action.data);
      userStore.emit(CHANGE_EVENT);
      console.log('userStore: ' + action.type);
      break;

    case appConstants.actionTypes.UPDATE_CURR_USER:
      setCurrentUserKey(action.data);
      userStore.emit(CHANGE_EVENT);
      console.log('userStore: ' + action.type);
    default:
      return true;
  }
})

module.exports = userStore;
