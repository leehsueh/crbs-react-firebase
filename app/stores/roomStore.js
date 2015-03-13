var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
  room: {
    passages: []
  }
}

// private setters
var setRoom = function(roomObj) {
  console.log('SET ROOM')
  _state.room = roomObj;
};

var updatePassages = function(passages) {
  _state.room.passages = passages;
};

var roomStore = objectAssign({}, EventEmitter.prototype, {
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

roomStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case appConstants.actionTypes.CHANGE_ROOM:
      setRoom(action.data);
      roomStore.emit(CHANGE_EVENT);
      console.log('roomStore: ' + action.type);
      break;

    case appConstants.actionTypes.UPDATE_PASSAGES:
      updatePassages(action.data);
      roomStore.emit(CHANGE_EVENT);
      console.log('roomStore: ' + action.type);

    default:
      return true;
  }
})

module.exports = roomStore;
