from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..helpers import *
from ..config import Config
from app.models import Comment, Post, Like, db


like_routes = Blueprint('likes', __name__)


@like_routes.route('/comments/<int:comment_id>')
def get_comment_likes(comment_id):
    comment_likes = Like.query.filter_by(commentId=comment_id).all()

    def comment_info(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId
        }
    return jsonify({"comment_likes": [comment_info(comment_like) for comment_like in comment_likes]})


@like_routes.route('/posts/<int:post_id>')
def get_post_likes(post_id):
    post_likes = Like.query.filter_by(postId=post_id).all()

    def post_info(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId
        }
    return jsonify({"post_likes": [post_info(post_like) for post_like in post_likes]})


@like_routes.route('/comments/<int:comment_id>', methods=['POST'])
def create_comment_likes(comment_id):
    def comment_info(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId
        }

    comment_likes = Like(
        # needs thunk logic
        userId=req.body.userId,
        postId=None,
        commentId=comment_id
    )
    db.session.add(comment_likes)
    db.session.commit()
    return comment_info(comment_likes)


@like_routes.route('/posts/<int:post_id>', methods=['POST'])
def create_post_likes(post_id):
    def post_info(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId
        }

    post_likes = Like(
        # needs thunk logic
        userId=req.body.userId,
        postId=post_id,
        commentId=None
    )
    db.session.add(post_likes)
    db.session.commit()
    return post_info(post_likes)