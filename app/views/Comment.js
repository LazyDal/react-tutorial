var React = require('react');

var Comment = React.createClass({displayName: "Comment",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("h4", null, this.props.author), 
				this.props.children
			)
		);
	}
});

module.exports = Comment;
