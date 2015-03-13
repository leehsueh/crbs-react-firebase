var React = require('react');

var NotesList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array
  },
  render: function(){
    var messages = this.props.messages.map(function(note, index){
      return <li className="list-group-item" key={index}><a style={{cursor:'pointer'}} onClick={this.props.onDelete.bind(null,note.key)}><i className="glyphicon glyphicon-remove"></i></a> {note.text} </li>
    }.bind(this));
    return (
      <ul className="list-group">
        {messages}
      </ul>
    )
  }
});

module.exports = NotesList;