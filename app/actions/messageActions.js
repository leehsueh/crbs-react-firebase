var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/FirebaseUtils');


var messageActions = {
  addMessage: function(roomKey, username, text) {
    firebaseUtils.addMessage(roomKey, username, text);
  }
}

module.exports = messageActions;