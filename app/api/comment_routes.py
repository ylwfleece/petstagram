from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..helpers import *
from ..config import Config
from app.models import Comment, Post
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def getPostComments(id):
    post = Post.query.get(id)
    comments = Comment.query.filter_by(postId=post.id).all()

    def comment_info(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "content": self.content
        }
    return jsonify({"comments": [comment_info(comment) for comment in comments]})


@comment_routes.route('/', methods=["POST"])
@login_required
def createComment(id):
    post = Post.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        commentData = form.data

        comment = Comment(
            postId=post.id,
            userId=current_user.get_id(),
            content=commentData
        )

        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict())
    return "Bad Data"

# in progress delete route
# @comment_routes.route('/', methods=["POST"])
# @login_required
# def deleteComment(id):
#     comment = Post.query.options(lazyload('comments')).first()
#     db.session.remove(comment)
#     db.session.commit
#     return
