var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');

var firebaseUtils = {
  homeInstance: function(){
    return new Firebase(appConstants.FIREBASE_HOST);
  },
  addNote: function(noteObj){
    this.homeInstance().child(noteObj.user).push(noteObj.note);
  },
  deleteNote: function(user, noteKey, cb) {
    this.homeInstance().child(user).child(noteKey).remove(cb);
  },
  toArrayWithKeys: function(valAttrName, snapshotVal){
    if (snapshotVal) {
      var arr = Object.keys(snapshotVal).map(function(key) {
        var obj = { key: key };
        obj[valAttrName] = snapshotVal[key];
        return obj;
      })
    }
    return arr;
  },
};

module.exports = firebaseUtils;