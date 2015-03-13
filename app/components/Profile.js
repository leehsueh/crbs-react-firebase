var React = require('react');
var Router = require('react-router');
var notesStore = require('../stores/notesStore');


var Left = require('../components/Github/Left');
var Middle = require('../components/Github/Middle');
var NotesContainer = require('../components/Notes/NotesContainer');

var Profile = React.createClass({
  mixins: [ Router.State ],
  render: function(){
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <Left username={username}/>
        </div>
        <div className="col-md-4">
          <Middle username={username}/>
        </div>
        <div className="col-md-4">
          <NotesContainer username={username}/>
        </div>
      </div>
    )
  }
});

module.exports = Profile;