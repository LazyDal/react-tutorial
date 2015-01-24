var React = require('react');

var CommentList = require('views/CommentList');
var CommentForm = require('views/CommentForm')
var commentsData = require('commentsData');

var CommentBox = React.createClass ({displayName: "CommentBox",
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
				React.createElement("div", null, 
					React.createElement("h1", null, "Comments"), 
					React.createElement(CommentList, {data: this.state.data}), 
					React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
				)
			);
		}
	});

module.exports = CommentBox;
