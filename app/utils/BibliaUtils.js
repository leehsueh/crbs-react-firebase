var appConstants = require('../constants/appConstants');
var bibliaServerActions = require('../actions/bibliaServerActions');
var axios = require('axios');
var querystring = require('querystring');

var CONTENT_API_URL = 'http://api.biblia.com/v1/bible/content/{version}.txt';
var API_KEY = "6936276c430fe411a35bb1f6ae786c19";

var bibliaUtils = {
  getPassage: function(fullRef){
    var translation = 'LEB';
    var payload = {
      key: API_KEY,
      passage: fullRef,
      style: 'orationOneVersePerLine'
    };
    var url = CONTENT_API_URL.replace("{version}", translation);

    return axios.get(url + '?' + querystring.stringify(payload));
  },
};

module.exports = bibliaUtils;