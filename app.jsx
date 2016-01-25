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
	
	handleSubmit(e) {
		e.preventDefault();
		// console.log(this, e);
		// const是定義常量 es2015的寫法，同 var
		// refs react內置的一個對像，獲取author的值， getDOMNode方法獲取對應html的對像， .value 獲取到值， trim() 是javascript的方法，刪除前後空格
		const author = this.refs.author.getDOMNode().value.trim();
		const body = this.refs.body.getDOMNode().value.trim();
		const form = this.refs.form.getDOMNode();
		// console.log(author,body);
		
		this.props.onSubmit({author: author, body: body});

		form.reset();
	}

	render() {
		return(
			<form className="comment-form" ref="form" onSubmit={(e) => {this.handleSubmit(e)}}>
				<input type="text" placeholder="Your name" ref="author" />
				<input type="text" placeholder="Input your comment" ref="body" />
				<input type="submit" value="Add Comment" />
			</form>
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
	
	handleNewComment(comment) {
		// console.log(comment);

		const comments = this.state.comments;
		const newComments = comments.concat([comment]);
		this.setState({comments: newComments});
		
		// 為了測試失敗後，變更回原本state的值，所以設定了一個 setTimeout的方法來延遲2秒
		setTimeout(() => {
			$.ajax({
				url: this.props.url,
				dataType: "json",
				type: "POST",
				data: comment,
				success: (comments) => {
					this.setState({comments: comments});
				},
				error: (xhr, status, err) => {
					console.log(err.toString());
					this.setState({comments: comments});
				}
			});			
		}, 2000);

	}

	render() {
		return (
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} />
				<CommentForm onSubmit={comment => {this.handleNewComment(comment)}} />
			</div>
		);
	}
}

box = React.render(
	<CommentBox url="comments.json" />,
	document.getElementById('content')
);