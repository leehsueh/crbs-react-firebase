var bibliaUtils = require('../utils/BibliaUtils');
var firebaseUtils = require('../utils/FirebaseUtils');
var appConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var serverActions = {
  receivedPassage: function(roomKey, fullRef, passageText) {
    // put it in firebase
    // get notified once it's in firebase
    firebaseUtils.addPassage(roomKey, {
      fullRef: fullRef,
      text: passageText
    });
    firebaseUtils.homeInstance().child(roomKey).child('passages').on('value', function(snapshot) {
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.UPDATE_PASSAGES,
        data: firebaseUtils.toArrayWithKeys(snapshot.val())
      })
    });
  }
};

module.exports = serverActions;