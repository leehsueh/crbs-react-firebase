var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
  rooms: [{name: 'Test', key: 'test'}],
}

// private setters
var createRoom = function(roomObj) {
  _state.rooms.push(roomObj);
};

var deleteRoom = function(roomKey) {
  _state.rooms = _state.rooms.filter(function(r) {
    return r.key !== roomKey
  });
};

var listRoomsStore = objectAssign({}, EventEmitter.prototype, {
  // let components register for changes
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // store read-only API
  getRooms: function() {
    return _state.rooms;
  },
});

listRoomsStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case appConstants.actionTypes.CREATE_ROOM:
      createRoom(action.data);
      listRoomsStore.emit(CHANGE_EVENT);
      console.log('listRoomsStore: ' + action.type);
      break;
    case appConstants.actionTypes.DELETE_ROOM:
      deleteRoom(action.data);
      listRoomsStore.emit(CHANGE_EVENT);
      console.log('listRoomsStore: ' + action.type);
      break;

    case appConstants.actionTypes.LIST_ROOMS:
      _state.rooms = action.data;
      listRoomsStore.emit(CHANGE_EVENT);
      console.log('listRoomsStore: ' + action.type);
      break;

    default:
      return true;
  }
})

module.exports = listRoomsStore;
