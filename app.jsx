class Comment extends React.Component {
	render() {
		return(
			<div>
				<div className="comment-body">
					{this.props.children}
				</div>
				<div className="comment-author">
					- {this.props.author}
				</div>
			</div>
		);
	}
}

class CommentForm extends React.Component {
	render() {
		return(
			<div className="comment-form">
				CommentForm
			</div>
		);
	}
}


class CommentList extends React.Component {
	render() {
		var commentsNode = this.props.comments.map(function(comment, index){
			return <Comment key={'comment-' + index} author={comment.author}>{comment.body}</Comment>
		});
		return(
			<div className="comment-list">
				{commentsNode}
			</div>
		);
	}
}
var comments = [
	{author: "Jovi lee", body: "this is my comment1"}
];
var other = [
	{author: "Jovi lee", body: "this is my comment1"},
	{author: "Nicole wu", body: "this is my comment2"}
];

class CommentBox extends React.Component {
	
	constructor(props) {
		super();
		this.state = {
			comments: props.comments
		}
	}

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} />
				<CommentForm />
			</div>
		);
	}
}

box = React.render(
	<CommentBox comments={other} />,
	document.getElementById('content')
);