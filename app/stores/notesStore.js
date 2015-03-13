var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var firebaseUtils = require('../utils/FirebaseUtils');

var CHANGE_EVENT = 'change';

// private data and setters
var _state = {
  user: '',
  notes: [] // array of objects with attributes text and key
};

var changeUser = function(userObj) {
  _state.user = userObj.user;
  _state.notes = userObj.notes || [];
};

var addNote = function(note) {
  _state.notes.push({text: note});
};

var deleteNote = function(noteKey) {
  _state.notes = _state.notes.filter(function(n) {
    return n.key !== noteKey;
  });
};

var notesStore = objectAssign({}, EventEmitter.prototype, {
  // let components register for changes
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // read-only API
  getState: function() {
    return _state;
  }
});

notesStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  console.log('notesStore: ' + action.type);

  switch(action.type) {
    case appConstants.CHANGE_USER:
      changeUser(action.data);
      notesStore.emit(CHANGE_EVENT);
      break;

    case appConstants.ADD_NOTE:
      addNote(action.data);
      notesStore.emit(CHANGE_EVENT);
      break;

    case appConstants.DELETE_NOTE:
      var noteKey = action.data;
      deleteNote(noteKey);

      break;
    default:
      return true;
  }
})

module.exports = notesStore;