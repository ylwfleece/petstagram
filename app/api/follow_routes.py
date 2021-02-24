from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Follow, User


follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/followers/:id')
@login_required
def get_all_user_followers():
    followers = db.session.query(Follow).all()
    return {"followers": [follower.to_dict() for follower in followers]}



@follow_routes.route("/followed/<int:id>", methods=["POST"])

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


@follow_routes.route("/:id/follower", methods=["DELETE"])
@login_required
def delete_follower(id):
    # Delete a follow relationship
    follower_id = request.json["followerId"]
    if current_user.id != id:
        return jsonify({"error": "Not authorized"})
    follower = User.query.get(follower_id)
    user = User.query.get(id)
    user.followers.remove(follower)
    db.session.commit()
    return jsonify({"unfollowed": True})