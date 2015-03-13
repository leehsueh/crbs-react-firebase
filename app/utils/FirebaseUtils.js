var Firebase = require('firebase');
var firebaseRoot = 'https://reactweek-crbs.firebaseio.com/';
var ref = new Firebase(firebaseRoot);
var firebaseUtils = {
  homeInstance: function(){
    return ref;
  },
  createRoom: function(roomName) {
    this.homeInstance().push({
      name: roomName,
    });
  },
  addPassage: function(roomKey, passage) {
    this.homeInstance().child(roomKey).child('passages').push(passage);
  },
  removePassage: function(roomKey, passageKey) {
    this.homeInstance().child(roomKey).child('passages').child(passageKey).remove();
  },
  resetPassages: function(roomKey) {
    this.homeInstance().child(roomKey).child('passages').remove();
  },
  addMessage: function(roomKey, messageObj) {
    this.homeInstance().child(roomKey).child('messages').push(messageObj);
  },
  addUser: function() {

  },
  removeUser: function(userKey) {

  },


  addNote: function(noteObj){
    this.homeInstance().child(noteObj.user).push(noteObj.note);
  },
  deleteNote: function(user, noteKey, cb) {
    this.homeInstance().child(user).child(noteKey).remove(cb);
  },
  toArrayWithKeys: function(snapshotVal, valAttrName){
    if (snapshotVal) {
      var arr = Object.keys(snapshotVal).map(function(key) {
        if (valAttrName) {
          var obj = { key: key };
          obj[valAttrName] = snapshotVal[key];
          return obj;
        } else if (typeof snapshotVal[key] === 'object') {
          // val is assumed to be
          var obj = snapshotVal[key];
          obj.key = key;
          return obj;
        }
      })
    }
    return arr;
  },
  valueWithKey: function(snapshot) {
    var obj = snapshot.val();
    obj.key = snapshot.key();
    return obj;
  }
};

module.exports = firebaseUtils;