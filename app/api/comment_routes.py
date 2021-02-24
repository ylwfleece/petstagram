from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..helpers import *
from ..config import Config
from app.models import Comment, Post, db
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:post_id>')
def getPostComments(post_id):
    comments = Comment.query.filter_by(postId=post_id).all()
    # comments = Comment.query.all()

    def comment_info(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "content": self.content
        }
    return jsonify({"comments": [comment_info(comment) for comment in comments]})


@comment_routes.route('/<int:post_id>', methods=["POST"])
# @login_required
def createComment(post_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    def comment_info(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "content": self.content
        }

    if form.validate_on_submit():
        commentData = form.data['content']

        comment = Comment(
            postId=post_id,
            userId=22,
            content=commentData
        )
        db.session.add(comment)
        db.session.commit()

        return comment_info(comment)
    return "Bad Data"

# in progress delete route
# @comment_routes.route('/', methods=["POST"])
# @login_required
# def deleteComment(id):
#     comment = Post.query.options(lazyload('comments')).first()
#     db.session.remove(comment)
#     db.session.commit
#     return
# {"postId": "6", "userId": 22, "content": "Great" }