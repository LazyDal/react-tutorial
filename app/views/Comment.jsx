var React = require('react');

var Comment = React.createClass({
	render: function () {
		return (
			<div>
				<h4>{this.props.author}</h4>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Comment;