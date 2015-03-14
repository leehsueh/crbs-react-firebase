var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/FirebaseUtils');
var bibliaUtils = require('../utils/BibliaUtils');

// set up firebase callbacks once...
// adding a room
firebaseUtils.homeInstance().on('child_added', function(childSnapshot) {
  console.log('on child added');
  console.log(childSnapshot.val());
  AppDispatcher.handleFirebaseAction({
    type: appConstants.actionTypes.CREATE_ROOM,
    data: firebaseUtils.valueWithKey(childSnapshot)
  });
});

firebaseUtils.homeInstance().on('child_removed', function(childSnapshot) {
  console.log('on child removed');
  console.log(childSnapshot.val());
  AppDispatcher.handleFirebaseAction({
    type: appConstants.actionTypes.DELETE_ROOM,
    data: childSnapshot.key()
  });
});

var roomActions = {
  createRoom: function(roomName) {
    firebaseUtils.homeInstance().push({ name: roomName });

  },
  listRooms: function() {
    firebaseUtils.homeInstance().on('value', function(snapshot) {
      console.log('on list rooms');
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.LIST_ROOMS,
        data: firebaseUtils.toArrayWithKeys(snapshot.val())
      });
    });
  },
  changeRoom: function(roomKey) {
    firebaseUtils.homeInstance().child(roomKey).once('value', function(snapshot) {
      console.log('on change room');
      var room = snapshot.val();
      // convert passages to array
      room.passages = firebaseUtils.toArrayWithKeys(room.passages);
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.CHANGE_ROOM,
        data: room
      });
    });

    // register changes on passages
    firebaseUtils.homeInstance().child(roomKey).child('passages').on('value', function(snapshot) {
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.UPDATE_PASSAGES,
        data: firebaseUtils.toArrayWithKeys(snapshot.val())
      })
    });

    // register changes on users
    firebaseUtils.homeInstance().child(roomKey).child('users').on('value', function(snapshot) {
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.UPDATE_USERS,
        data: firebaseUtils.toArrayWithKeys(snapshot.val(), 'name')
      });

    });

    // register changes on messages
    firebaseUtils.homeInstance().child(roomKey).child('messages').on('value', function(snapshot) {
      AppDispatcher.handleFirebaseAction({
        type: appConstants.actionTypes.UPDATE_MESSAGES,
        data: firebaseUtils.toArrayWithKeys(snapshot.val())
      })
    });
  },
}

module.exports = roomActions;