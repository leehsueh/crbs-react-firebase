var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var githubUtils = require('../utils/GithubUtils');

var githubActions = {
  getUserBio: function(username) {
    githubUtils.getBio(username).then(function(response) {
      AppDispatcher.handleAction({
        type: appConstants.GITHUB_USER_BIO,
        data: response.data
      });
    });
  },
  getUserRepos: function(username) {
    githubUtils.getRepos(username).then(function(response) {
      AppDispatcher.handleAction({
        type: appConstants.GITHUB_USER_REPOS,
        data: response.data
      });
    });
  },
  changeUser: function(username) {
    AppDispatcher.handleAction({
      type: appConstants.GITHUB_CHANGE_USER,
      data: username
    });
  }
}

module.exports = githubActions;