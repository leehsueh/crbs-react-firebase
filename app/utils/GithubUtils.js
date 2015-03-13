var appConstants = require('../constants/appConstants');
var axios = require('axios');

var id = "b0f9011a6f5038fbc0b4";
var sec = "4ef3ed937e2474e11ffbc4489d4b57e97e40dbdf";

var param = "?client_id=" + id + "&client_secret=" + sec;

var githubUtils = {
  getBio: function(username){
    var url = "https://api.github.com/users/" + username + param;
    return axios.get(url);
  },
  getRepos: function(username){
    var url = "https://api.github.com/users/" + username + "/repos" + param;
    return axios.get(url);
  }
};

module.exports = githubUtils;