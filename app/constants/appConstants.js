var keyMirror = require('react/lib/keyMirror');
var constants = keyMirror({
  GITHUB_USER_BIO: null,
  GITHUB_USER_REPOS: null,
  GITHUB_CHANGE_USER: null,

  ADD_NOTE: null,
  DELETE_NOTE: null,
  CHANGE_USER: null,
});

constants.FIREBASE_HOST = 'https://hlh-react-github-notetaker.firebaseio.com/';

module.exports = constants;