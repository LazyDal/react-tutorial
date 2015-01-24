# react-tutorial
A pareallel version of introduction to React from the official React site

This is my first commit to GitHub, which may give you a boost in confidence if you are still searching for yourself as a programmer, since I am no less than 39 years old :). That said I am not really a novice coder but rather the one who only recently started learning coding seriously and decided to specialize in web development.
I am starting out with JavaScript React, which I have chosen after experimenting with many JS frameworks (Angular and Backbone, among others). One part of the reason for using React is it's extension, Flux, an almost-framework for JS which rejects two very popular approaches to front-end design: two-way data binding and MVC pattern. They are replaced with, in my opinion, much more rational one-way binding and streamlined event model. You can check out these videos on this topic: https://www.youtube.com/watch?v=nYkdrAPrdcw#t=0h10m24s and https://www.youtube.com/watch?v=Bic_sFiaNDI. However, there is one place where Flux is somewhat lacking - the data layer. But Backbone's model, collection and sync services seems to fill this gap perfectly – as  you can read here: http://www.toptal.com/front-end/simple-data-flow-in-react-applications-using-flux-and-backbone. I really recommend you to skim through this article as it convincingly explains why to choose React+Backbone for your front-end.
As for the in-coming technology which rivals React, web-component standard based Polymer from Google, since it requires native browser support, you can't do much with it at the moment, so React is currently the only choice for building composable web user interfaces. I personally find React and Backbone to be a great match, and with Node and MongoDB on the server side, which are both minimalistic JS-centric projects, they are a complete and simple solution for web applications.
So I decided to write a succinct introduction to React, a parallel version of the program from the official React site http://facebook.github.io/react/docs/tutorial.html, only without server side related code and with modular instead of single-file structure. This will be achieved using CommonJS modules and the belonging npm package manager.
React is all about building web interfaces out of composable and lightning-fast rendering view components. A React view component is nothing else but a JavaScript object instance which can contain a number of standard methods, of which render method, which shows a component, is the only mandatory one. This is how we create a component:
```
var CommentBox = React.createClass({
  render: function() {
    return ( <div> Hello, world! I am a CommentBox. </div> );
  }
});
```
Render function returns a tree of React components that will eventually render to HTML – here there is no nested components but only a single div element. This is not an actual div but is actually a React component, which is, instead of being inserted into a real DOM, inserted into so-called virtual DOM - a structure that React uses to perform it's smart and fast rendering. As a comparison,  a “virtual” React div has only five attributes, where real div has several dozens of attributes which have to be set and dealt with.
Now, as for the code itself, you can see that this is no ordinary JavaScript – there is HTML thrown inside. This simple extension of JS which allows you to easily mix JS and HTML is called JSX and has to be compiled into vanilla JS by a JSX compiler (or as it is also called transformer), before it can be used by the browser.
Now we need some HTML to insert this in:
```
<html> 
<head> 
	<title>Comments</title> 
	<meta charset="UTF-8"></meta> 
	<script src="http://fb.me/react-0.12.2.js"></script>
    <script src="http://fb.me/JSXTransformer-0.12.2.js"></script>
</head> 
<body> 
	<div id="content"></div> 
	<script type="text/jsx">
		// we will be putting all code in here
	</script> 
</body> 
</html>
```
After you insert the component inside the script tag, nothing will be render yet, because we need to instruct React to render the component, like so:
React.render( <CommentBox />, document.getElementById('content'));
React.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element provided as the second argument. Now the component will be shown on screen.
What we will continue to build is a simple commenting functionality, with the following component structure:
- CommentBox
  - CommentList
    - Comment
  - CommentForm
We implement this in React like so:
```
var CommentList = React.createClass({
  render: function() {
    return (
      <div>
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
var Comment = React.createClass({
  render: function() {
    return (
      <div>
        <h2> {this.props.author} </h2>
        {this.props.children}
      </div>
    );
  }
});
var CommentForm = React.createClass({
  render: function() {
    return (
      <div>
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var CommentBox = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
```
Notice how we nest the components. The Comment component has some funky looking code. By surrounding a JavaScript expression in braces inside JSX, as either an attribute or child, you can drop text or React components into the tree. We access named attributes passed to the component as keys on this.props and any nested elements as this.props.children.
Now let's represent data as a blob of JSON:
```
var commentsData = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
We pass this data to CommmentBox component:
React.render(
  <CommentBox data={commentsData} />,
  document.getElementById('content')
);
```
And access it from CommentBox component:
```
<CommentList data={this.props.data} />
```
We pass it on to CommentList component, from where it will be accessible as this.props.data. Using this data is the first less trivial usage of JavaScipt in this example:
```
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div> {commentNodes} </div>
    );
  }
});
```
This will render the data dynamically. With this, Comment and CommentList components are finished.
So far, each component has rendered itself once based on its props. props are immutable: they are passed from the parent and are "owned" by the parent. To implement interactions, we introduce mutable state to the component. this.state is private to the component and can be changed by calling this.setState(). When the state is updated, the component re-renders itself.
render() methods are written declaratively as functions of this.props and this.state. The framework guarantees the UI is always consistent with the inputs.
Let's add an array of comment data to the CommentBox component as its state:
```
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
componentDidMount: function () { 
	this.setState({data: this.props.data}); 
},
  render: function() {
    return (
      <div>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```
getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component. componentDidMount is a method called automatically by React when a component is rendered. The key to dynamic updates is the call to this.setState(), which also automatically re-renders the component.
Now we want to enable interactivity, through adding new comments. Unlike showing components, this requires some more thinking. When the user submits the form, we should clear it, memorize the new comment, and refresh the list of comments. To start, let's define the form and listen for it's submit event:
```
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    // TODO: memorize the new comment and clear the input boxes
    return;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```
React attaches event handlers to components using a camelCase naming convention. We attach an onSubmit handler to the form that clears the form fields when the form is submitted with valid input. We call preventDefault() on the event to prevent the browser's default action of submitting the form.
Next we will implement clearing the input fields:
```
<input type="text" placeholder="Your name" ref="author" />
<input type="text" placeholder="Say something..." ref="text" />
// TODO:  memorize the new comment
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
```
We use the ref attribute to assign a name to a child component and this.refs to reference the component. We can call getDOMNode() on a component to get the native browser DOM element.
For the end, we will implement the most complicated functionality – memorizing new comments. We will start by fetching the text from input fields and immediately returning if either of the fields is empty:
```
	...
	e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
// TODO: memorize the new comment
```
What we now need to do is to somehow send author and text variables to CommentBox component, whose state we need to change - that is, to add a new comment. We do this by defining a callback in CommentBox, that we make available to CommentForm and use it in CommentForm like so:
```
...
if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
…
```
We make the callback available to CommentForm like so:
```
...
	<CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
…
```
The callback itself, called  handleCommentSubmit, is defined like this:
```
	...
	componentDidMount: function () { 
		this.setState({data: this.props.data}); 
	}, 
	handleCommentSubmit: function (comment) { 
		commentsData.push(comment); 
		this.setState({data: commentsData}); 
	}, 
	render: function () {
	...
```
So in our parent's render method we pass a callback handleCommentSubmit into the child, through attribute onCommentSubmit. Now, whenever the onSubmit event is triggered from CommentForm, handleCommentSubmit callback from CommentBox will be invoked, which as you can see adds comment to commentsData array and than updates the state of CommentBox accordingly.
And this completes the example. When you now save and double-click the html file you should get the example working.
What is not demonstrated here but is on official React site, is that React is safe - which means you can not directly create HTML from it. Only React itself does inserting HTML, while if you try to do this yourself through JavaScript, browser will not render HTML but will show plain text, such as “<h1>This is not HTML</h1>”. This is done to disable XSS attacks. If you still need to process HTML however, it can be done, as shown on official React site, but is not recommended.
Now I will show how React is used in a modular fashion. To this end we will utilize CommonJS format and npm package manager. If you don't have npm installed you can do it from debian linuxes command line like so: sudo apt-get install npm. Now enter the directory which will hold the program and type npm init to start the project. You can just press enter on each question that will appear. After you are finished you will get project.json file in the directory, the all-important file in every npm project.
Next get React packed for npm like this: npm install --save react. --save flag means react package will be listed as a dependency in project.json file (otherwise it won't). You will see a new folder named node_modules, which is the place where npm holds locally present modules (we will soon see a different use case – globally installed modules) and react folder inside. Before trying out react prepacked like this, we will modularize the program by putting views in individual modules, inside the /app/views folder. /app folder usually holds the JavaScript files used by the application, where app.js is the main JavaScript file that wires everything up.
Now simply copy component code in separate files, named as that component with .jsx extension. However, in every file you need to add reference to react: var React = require('react'); This is the standard way to use npm modules. Because we want to use these modules elsewhere, we also add an export statement on the end of the file: module.exports = <ReactComponentName> (replace with actual name).
Next, in the app folder put the following commentsData.js file:
```
var commentsData = [ 
  {author: "Pete Hunt", text: "This is one comment"}, 
  {author: "Jordan Walke", text: "This is *another* comment"} 
]; 
module.exports = commentsData;
```
Now add the following after the React require in CommentList: 
```
var Comment = require('views/Comment'); 
```
and in CommentBox:
```
var CommentList = require('views/CommentList'); 
var CommentForm = require('views/CommentForm');
var commentsData = require('commentsData');
```
We now need to compile these jsx files  to plain JavaScript. We do this with jsx tool, which can be installed as an npm module as following: npm install -g jsx. -g switch means that the module will be installed globaly and not in the node_modules folder. Now, I admit I have some troubles in using this command as it should be used, to compile the whole directory. I typed like so instead: 'jsx CommentBox.jsx > CommentBox.js' for each file. Anyway you will end up with 4 .js files.
The main JavaScript file, app.js inside of the app folder, will look like this:
```
var React = require('react'); 
var CommentBox = require('views/CommentBox.js'); 
var commentsData = require('commentsData');
React.render( <CommentBox data={commentsData} />, document.getElementById('content'));
```
Since browser natively doesn't support CommonJS modules, we need special tool to use them. We will use browserify, although webpack is another very popular one with even more options. Browserify does two things: it walks up the dependency tree defined with require commands and bundles all necessary files into a single file, and defines require command that we can use from the browser. We will also use reactify, a tool which allows us to bundle jsx files from browserify. We install browserify with the -g switch and reactify localy, but with --save-dev instead --save switch, which means that this is a development dependency and is not needed in production.
Now, because of the way on which CommonJS works, browserify will not be able to find modules in the app folder - but we can circumvent this by using symbolic links: we make node-modules directory inside of app directory, cd to that directory and issue 'ln -sf ../views' and 'ln -sf ../commentsData' command.
Browserify will now be used like this: browserify -t reactify index.js > public/js/bundle.js. -t switch means we are applying transform on the index.js file, but be careful: transform is only applied to the top-level files, which is app.js in our case. The files that we require from app.js will not be transformed so we need to compile them by hand, which we already did.
Finally, before trying this out we need our html file, which we put in the public folder:
```
<html> 
<head> 
	<title>Comments</title> 
	<meta charset="UTF-8"></meta> 
</head> 
<body> 
	<div id="content"></div> 
	<script src='js/bundle.js'></script> 
</body> 
</html>
```
Notice how we only reference bundle.js JavaScript, since browserify will bundle all the JS files we need into this single file. If everything works fine, by double-clicking the html you will get the same result as when previously running from the single file.
On a final note, I would advise you NOT to use the very popular grunt or gulp task managers, but instead to use npm for scripting the tasks. Here is the text that explains why: http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/.
To do this open package.json file and add the following lines bellow the dependencies section:
```
...
},
"scripts": { 
    "build:browserify": "browserify -t reactify app.js > public/js/bundle.js" 
  },
…
```
Now instead of typing or revoking the browserify command each time you change the project, you can just type 'npm run build:browserify'. You can check out the follow-up of the previous text on how to use npm as scripting tool: http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool.
I know this text is somewhere between programers log and what is usually found on GitHub, but I still thought it belongs here. Cheers!
