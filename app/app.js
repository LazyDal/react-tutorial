var React = require('react');
var CommentBox = require('views/CommentBox.js');
var commentsData = require('commentsData');

React.render( <CommentBox data={commentsData} />, document.getElementById('content'));