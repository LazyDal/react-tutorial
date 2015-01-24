var React = require('react');

var Comment = require('views/Comment');

var CommentList = React.createClass({displayName: "CommentList",
		render: function() {
			var commentNodes = this.props.data.map(function (comment) {
				return (
					React.createElement(Comment, {author: comment.author}, 
					comment.text
					)
				);
			});
			return (
				React.createElement("div", null, 
					commentNodes
				)
			);
		}
	});

module.exports = CommentList;
