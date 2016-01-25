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
		return(
			<div className="comment-list">
				<Comment author="jovi">
					This is my comment.
				</Comment>
				<Comment author="leon">
					This is my comment2.
				</Comment>
				<Comment author="jenny">
					This is my comment3.
				</Comment>
			</div>
		);
	}
}

class CommentBox extends React.Component {

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
}

count = React.render(
	<CommentBox />,
	document.getElementById('content')
);