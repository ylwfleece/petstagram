from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..helpers import *
from ..config import Config
from app.models import Comment, Post, Like, db


like_routes = Blueprint('likes', __name__)


@like_routes.route('/', methods=["GET"])
def get_all_likes():
    likes = Like.query.all()

    def comment_info(self, username, profilePhoto):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId,
            "username": username,
            "profilePhoto": profilePhoto
        }
    return {"likes": [comment_info(like, like.user.username, like.user.profilePhotoUrl) for like in likes]}


@likes_routes.route('/comments', methods=["GET"])
def get_comment_likes():
    likes = Like.query.filter(Like.comment_id is not null).all()
    ret_likes = []
    for like in likes:
        ret_likes.append(like.comment_info(
            like.user.username, like.user.profilePhotoUrl))
    return jsonify ret_likes


# @like_routes.route('/comments/<int:comment_id>')
# def get_comment_likes(comment_id):
#     comment_likes = Like.query.filter_by(commentId=comment_id).all()

#     def comment_info(self):
#         return {
#             "id": self.id,
#             "userId": self.userId,
#             "postId": self.postId,
#             "commentId": self.commentId
#         }
#     return {"comment_likes": [comment_info(comment_like) for comment_like in comment_likes]}


# @like_routes.route('/posts/<int:post_id>')
# def get_post_likes(post_id):
#     post_likes = Like.query.filter_by(postId=post_id).all()

#     def post_info(self):
#         return {
#             "id": self.id,
#             "userId": self.userId,
#             "postId": self.postId,
#             "commentId": self.commentId
#         }
#     return {"post_likes": [post_info(post_like) for post_like in post_likes]}


@ like_routes.route('/comments/<int:comment_id>', methods=['POST'])
@ login_required
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
        userId=current_user.id,
        postId=None,
        commentId=comment_id
    )
    db.session.add(comment_likes)
    db.session.commit()
    return comment_info(comment_likes)


@like_routes.route('/posts/<int:post_id>', methods=['POST'])
@login_required
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
        userId=current_user.id,
        postId=post_id,
        commentId=None
    )
    db.session.add(post_likes)
    db.session.commit()
    return post_info(post_likes)


@like_routes.route('/posts/delete/<int:post_id>', methods=['POST'])
@login_required
def delete_post_likes(post_id):
    like = Like.query.filter_by(postId=post_id, userId=current_user.id).first()
    db.session.delete(like)
    db.session.commit()
    return "deleted like on post"


@like_routes.route('/comments/delete/<int:comment_id>', methods=['POST'])
@login_required
def delete_comment_likes(comment_id):
    like = Like.query.filter_by(
        commentId=comment_id, userId=current_user.id).first()
    db.session.delete(like)
    db.session.commit()
    return "deleted like on comment"
