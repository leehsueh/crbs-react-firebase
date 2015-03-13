var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/FirebaseUtils');


var notesActions = {
  changeUser: function(username) {
    firebaseUtils.homeInstance().child(username).on('value', function(snapshot) {
      AppDispatcher.handleAction({
        type: appConstants.CHANGE_USER,
        data: {
          user: username,
          notes: firebaseUtils.toArrayWithKeys('text', snapshot.val()),
        }
      });
    })
  },

  addNote: function(noteObj) {
    AppDispatcher.handleAction({
      type: appConstants.ADD_NOTE,
      data: noteObj.note
    });
    firebaseUtils.addNote(noteObj);
  },

  deleteNote: function(user, noteKey) {
    debugger;
    AppDispatcher.handleAction({
      type: appConstants.DELETE_NOTE,
      data: noteKey
    });
    firebaseUtils.deleteNote(user, noteKey, function(err) {
      if (err) {
        // handle error
        console.log('There was an error deleting a note!');

        // TODO: fire off an "error" action
      }
    });
  }
}

module.exports = notesActions;