var React = require('react');
var Router = require('react-router');

var AddPassage = React.createClass({
  propTypes: {
    onAddPassage: React.PropTypes.func
  },
  handleSubmit: function(e){
    e.preventDefault();
    var fullRef = this.refs.fullRef.getDOMNode().value;
    this.refs.fullRef.getDOMNode().value = '';
    if (fullRef.trim().length > 0) {
      this.props.onAddPassage(fullRef);
    }
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" className="form-control" ref="fullRef" placeholder="Bible reference (e.g. John 3:16)" />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-block btn-primary">Add Passage</button>
            </span>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = AddPassage;