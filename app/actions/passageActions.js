var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var bibliaUtils = require('../utils/BibliaUtils');
var firebaseUtils = require('../utils/FirebaseUtils');
var bibliaServerActions = require('../actions/bibliaServerActions');


var passageActions = {
  fetchPassage: function(roomKey, fullRef) {
    // starts ajax request to biblia and when returns, invokes
    // a server action
    bibliaUtils.getPassage(fullRef).then(function(response) {
      bibliaServerActions.receivedPassage(roomKey, fullRef, response.data);
    });
  },
  removePassage: function(roomKey, passageKey) {
    firebaseUtils.removePassage(roomKey, passageKey);
  }
}

module.exports = passageActions;