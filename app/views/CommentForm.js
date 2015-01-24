var React = require('react');

var CommentForm = React.createClass({displayName: "CommentForm",
		handleSubmit: function (ev) {
			ev.preventDefault();
			var author = this.refs.inputAuthor.getDOMNode().value.trim();
			var text = this.refs.inputText.getDOMNode().value.trim();
			if (!text || !author) {
			      return;
			}
			this.props.onCommentSubmit({ author: author, text: text });
			this.refs.inputAuthor.getDOMNode().value = '';
			    this.refs.inputText.getDOMNode().value = '';
			    return;
		},
		render: function () {
			return (
				React.createElement("form", {onSubmit: this.handleSubmit}, 
					React.createElement("input", {type: "text", placeholder: "Your name", ref: "inputAuthor"}), 
        					React.createElement("input", {type: "text", placeholder: "Say something...", ref: "inputText"}), 
        					React.createElement("input", {type: "submit", value: "Post"})
				)
			);
		}
	});

module.exports = CommentForm;
