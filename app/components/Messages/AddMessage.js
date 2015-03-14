var React = require('react');

var AddMessage = React.createClass({
  propTypes: {
    onAddMessage: React.PropTypes.func.isRequired
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var note = this.refs.newNote.getDOMNode().value;
    if (note.trim()) {
      this.props.onAddMessage(note);
      this.refs.newNote.getDOMNode().value = '';
    }
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input className="form-control" type="text" ref="newNote"/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default input-append">Send</button>
          </span>
        </div>
      </form>
    );
  }
});

module.exports = AddMessage;