var React = require('react');

var CommentForm = React.createClass({
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
				<form onSubmit={this.handleSubmit} >
					<input type="text" placeholder="Your name" ref="inputAuthor" />
        					<input type="text" placeholder="Say something..." ref="inputText" />
        					<input type="submit" value="Post" />
				</form>
			);
		}
	});

module.exports = CommentForm;