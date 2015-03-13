var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
  user: '',
  bio: {},
  repos: []
}

// private setters
var newUser = function(userName) {
  _state.user = userName;
};

var setBio = function(bio) {
  _state.bio = bio;
};

var setRepos = function(repos) {
  _state.repos = repos;
};

var githubStore = objectAssign({}, EventEmitter.prototype, {
  // let components register for changes
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // store read-only API
  getUser: function() {
    return _state.user;
  },
  getBio: function() {
    return _state.bio;
  },
  getRepos: function() {
    return _state.repos;
  }
});

githubStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  console.log('githubStore: ' + action.type);
  switch (action.type) {
    case appConstants.GITHUB_CHANGE_USER:
      newUser(action.data);
      githubStore.emit(CHANGE_EVENT);
      break;

    case appConstants.GITHUB_USER_BIO:
      setBio(action.data);
      githubStore.emit(CHANGE_EVENT);
      break;

    case appConstants.GITHUB_USER_REPOS:
      setRepos(action.data);
      githubStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
})

module.exports = githubStore;
