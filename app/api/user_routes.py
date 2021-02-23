from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..app.models import db, Follow, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# follow routes ----------
@user_routes.route('/user/:id/followers')
@login_required
def get_all_user_followers():
    followers = db.session.query(Follow).all()
    return {"followers": [follower.to_dict() for follower in followers]}


@user_routes.route("/:id/follower", methods=["POST"])
@login_required
def add_follower(id):
    # Creates a follow relationship
    followed_id = Follow.query.get(id)
    follower_id = request.json["followerId"]
    if current_user.id != follower_id:
        return jsonify({"error": "Not authorized"})
    follower = User.query.get(follower_id)
    user = User.query.get(id)
    user.followers.append(follower)
    db.session.commit()
    return jsonify({"followed": True})


@user_routes.route("/:id/follower", methods=["DELETE"])
@login_required
def delete_follower(id):
    # delete a follow relationship
    follower_id = request.json["followerId"]
    if current_user.id != id:
        return jsonify({"error": "Not authorized"})
    follower = User.query.get(follower_id)
    user = User.query.get(id)
    user.followers.remove(follower)
    db.session.commit()
    return jsonify({"unfollowed": True})
