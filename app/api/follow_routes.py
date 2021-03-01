from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User


def follow_to_dict(follow):
    return {
        "id": follow.id,
    }


follow_routes = Blueprint('follows', __name__)


@follow_routes.route("/followed/<int:id_param>", methods=["POST"])
@login_required
def add_follower(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    to_follow = User.query.filter(User.id == id_param).first()
    user.followers.append(to_follow)
    to_follow.follows.append(user)
    db.session.add(user)
    db.session.add(to_follow)
    db.session.commit()
    followers_to_return = []
    for follower in user.followers:
        followers_to_return.append(follow_to_dict(follower))
    return jsonify(followers_to_return)

@follow_routes.route("/unfollowed/<int:id_param>", methods=["POST"])
@login_required
def unfollow(id_param):
    user = User.query.filter(User.id == current_user.id).first()
    to_unfollow = User.query.filter(User.id == id_param).first()
    user.followers.remove(to_unfollow)
    to_unfollow.follows.remove(user)
    db.session.add(user)
    db.session.add(to_unfollow)
    db.session.commit()
    followers_to_return = []
    for follower in user.followers:
        followers_to_return.append(follow_to_dict(follower))
    return jsonify(followers_to_return)


# @follow_routes.route("/:id/follower", methods=["DELETE"])
# @login_required
# def delete_follower(id):
#     # Delete a follow relationship
#     follower_id = request.json["followerId"]
#     if current_user.id != id:
#         return jsonify({"error": "Not authorized"})
#     follower = User.query.get(follower_id)
#     user = User.query.get(id)
#     user.followers.remove(follower)
#     db.session.commit()
#     return jsonify({"unfollowed": True})

# @follow_routes.route('/followers/:id')
# @login_required
# def get_all_user_followers():
#     followers = db.session.query(Follow).all()
#     return {"followers": [follower.to_dict() for follower in followers]}