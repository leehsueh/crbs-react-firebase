var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/FirebaseUtils');


var userActions = {
  enterUser: function(roomKey, username) {
    var ref = firebaseUtils.enterUser(roomKey, username);
    AppDispatcher.handleViewAction({
      type: appConstants.actionTypes.UPDATE_CURR_USER,
      data: ref.key()
    });
  },
  exitUser: function(roomKey, userKey) {
    firebaseUtils.exitUser(roomKey, userKey);
  },
  changeName: function(roomKey, userKey, newName) {
    firebaseUtils.setUser(roomKey, userKey, newName);
  }
}

module.exports = userActions;