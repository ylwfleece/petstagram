from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models import User

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:search_term>', methods=['GET'])
# @login_required
def user(search_term):
    users = User.query.filter(User.username.like(f'%{search_term}%')).all()
    users_to_return = []
    for user in users:
        users_to_return.append(user.to_dict())
    print(users_to_return)
    return jsonify(users_to_return)


