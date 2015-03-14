var React = require('react');
var AddPassage = require('./AddPassage');
var passageActions = require('../../actions/passageActions');

var Passages = React.createClass({
  propTypes: {
    passages: React.PropTypes.array,
    roomKey: React.PropTypes.string.isRequired
  },
  handleAddPassage: function(fullRef) {
    // get room key from router params
    var roomKey = this.props.roomKey;
    passageActions.fetchPassage(roomKey, fullRef);
  },
  handleRemovePassage: function(passageKey) {
    passageActions.removePassage(this.props.roomKey, passageKey);
  },
  render: function() {
    var passageItems;
    if (this.props.passages) {
      passageItems = this.props.passages.map(function(passage, index) {
        return (
          <div className="col-sm-6" key={passage.key}>
            <a className="close" onClick={this.handleRemovePassage.bind(null, passage.key)}>&times;</a>
            <h4>{passage.fullRef}</h4>
            <div style={{maxHeight: 300, overflowY: 'scroll'}}>{passage.text}</div>
          </div>
        )
      }.bind(this));
    }
    return (
      <div>
        <AddPassage onAddPassage={this.handleAddPassage} />
        <div className="col-sm-12">
          {passageItems}
        </div>
      </div>
    );
  }
})

module.exports = Passages;