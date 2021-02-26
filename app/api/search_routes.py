from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models import User


def follow_to_dict(follow):
    return {
        "id": follow.id,
    }


def user_to_dict(user):
    return {
        "id": user.id
    }


search_routes = Blueprint('search', __name__)

@search_routes.route('/follows', methods=['GET'])
# @login_required
def follows():
    # result = db.session.execute(
    #         '''SELECT * FROM users WHERE id=:param''',
    #         {"param": current_user.id}
    #     )
    follows = User.query.filter(User.id == current_user.id).first().follows
    # follows = user.follows
    follows_to_return = []
    for follow in follows:
        follows_to_return.append(follow_to_dict(follow))
    # follows_to_return = []
    # for result in results:
    #     follows_to_return.append(follow_to_dict(result))
    return jsonify(follows_to_return)

@search_routes.route('/<string:search_term>', methods=['GET'])
# @login_required
def user(search_term):
    users = User.query.filter(User.username.ilike(f'%{search_term}%')).all()
    users_to_return = []
    for user in users:
        users_to_return.append(user.to_dict())
    print(users_to_return)
    return jsonify(users_to_return)




