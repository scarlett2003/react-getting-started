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


class CommentBox extends React.Component {
	
	constructor(props) {
		super();
		this.state = {
			comments: props.comments || []
		}
	}
	
	loadDataFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			success: comments => {
				this.setState({comments: comments});
			},
			error: (xhr, status, err) => {
				console.log(err.toString());
			}
		});
	}


	componentDidMount() {
		this.loadDataFromServer();
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
	<CommentBox url="comments.json" />,
	document.getElementById('content')
);