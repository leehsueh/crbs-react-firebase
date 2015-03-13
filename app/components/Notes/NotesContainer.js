var React = require('react');
var AddNote = require('./AddNote');
var NotesList = require('./NotesList');
var notesStore = require('../../stores/notesStore');
var notesActions = require('../../actions/notesActions');

var NotesContainer = React.createClass({
  getInitialState: function() {
    return notesStore.getState();
  },
  componentWillMount: function() {
    notesStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount: function() {
    notesStore.removeChangeListener(this.handleChange);
  },
  componentDidMount: function() {
    // fire off first action to get notes
    notesActions.changeUser(this.props.username);
  },
  componentWillReceiveProps: function(nextProps) {
    // change the notes to reflect the user user
    notesActions.changeUser(nextProps.username);
  },
  handleChange: function() {
    this.setState(notesStore.getState());
  },
  handleDelete: function(noteKey) {
    notesActions.deleteNote(this.props.username, noteKey);
  },
  render: function() {
    return (
      <div>
        <h3>Notes for {this.props.username}</h3>
        <AddNote username={this.props.username} />
        <NotesList notes={this.state.notes} onDelete={this.handleDelete} />
      </div>
    );
  }
});

module.exports = NotesContainer;