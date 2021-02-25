from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/search/<string:search_term>', methods=['GET'])
# # @login_required
# def user(search_term):
#     users = User.query.filter(User.username.like(f'%{search_term}%')).all()
#     users_to_return = []
#     for user in users:
#         users_to_return.append(user.to_dict())
#     print(users_to_return)
#     return jsonify(users_to_return)
