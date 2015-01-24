var React = require('react');

var Comment = require('views/Comment');

var CommentList = React.createClass({
		render: function() {
			var commentNodes = this.props.data.map(function (comment) {
				return (
					<Comment author= {comment.author}>
					{comment.text}
					</Comment>
				);
			});
			return (
				<div>
					{commentNodes}
				</div>
			);
		}
	});

module.exports = CommentList;