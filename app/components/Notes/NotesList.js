var React = require('react');

var NotesList = React.createClass({
  propTypes: {
    onDelete: React.PropTypes.func.isRequired
  },
  render: function(){
    var notes = this.props.notes.map(function(note, index){
      return <li className="list-group-item" key={index}><a style={{cursor:'pointer'}} onClick={this.props.onDelete.bind(null,note.key)}><i className="glyphicon glyphicon-remove"></i></a> {note.text} </li>
    }.bind(this));
    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});

module.exports = NotesList;