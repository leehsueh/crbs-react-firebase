var keyMirror = require('react/lib/keyMirror');
var actionTypes = keyMirror({
  LIST_ROOMS: null,
  CREATE_ROOM: null,
  CHANGE_ROOM: null,
  DELETE_ROOM: null,

  UPDATE_PASSAGES: null,
  UPDATE_USERS: null,
  UPDATE_MESSAGES: null
});


module.exports = {
  actionTypes: actionTypes,
}