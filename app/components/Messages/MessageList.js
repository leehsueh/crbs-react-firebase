var React = require('react');

var MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array
  },
  render: function(){
    var messages = this.props.messages.map(function(note, index){
      return <div key={index}><small><b>{note.user}:</b></small><br/> {note.text} </div>
    }.bind(this));
    return (
      <div className="well" style={{maxHeight:600, overflowY: 'scroll'}}>
        {messages}
      </div>
    )
  }
});

module.exports = MessageList;