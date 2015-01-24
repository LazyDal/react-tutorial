var React = require('react');

var CommentList = require('views/CommentList');
var CommentForm = require('views/CommentForm')
var commentsData = require('commentsData');

var CommentBox = React.createClass ({
		getInitialState: function () {
			return ({data:[]});
		},
		componentDidMount: function () {
			this.setState({data: this.props.data});
		},
		handleCommentSubmit: function (comment) {
			commentsData.push(comment);
			this.setState({data: commentsData});
		},
		render: function () {
			return (
				<div>
					<h1>Comments</h1>
					<CommentList data={this.state.data} />
					<CommentForm onCommentSubmit = {this.handleCommentSubmit} />
				</div>
			);
		}
	});

module.exports = CommentBox;