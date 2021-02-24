from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from ..helpers import *
from ..config import Config
from app.models import Post, User, db
# from app.forms import PhotoForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<userId>', methods=["GET"])
# @login_required
def get_posts(userId):
    user = User.query.get(userId)
    followers = user.followers # people the user follows
    # follows = user.follows (people who follow the user)
    ids_to_query = [int(userId)]
    for follower in followers:
        ids_to_query.append(follower.id)
    # print(ids_to_query)
    posts = set()
    for id in ids_to_query:
        posts_from_userId = Post.query.filter(Post.userId == id).all()
        posts = posts | set(posts_from_userId)
    # print('===> posts: ', posts)
    posts_to_return = []
    for post in posts:
        posts_to_return.append(post.to_dict())
    return jsonify(posts_to_return)

@post_routes.route('/', methods=["POST"])
@login_required
def create_posts():

    form = PhotoForm()
    file = request.files.get("feed_photo_file")
    caption = request.form.get('caption')

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.data['feed_photo_file']

        if file:
            file.filename = secure_filename(file.filename)
            s3_photo_url = upload_file_to_s3(file, Config.S3_BUCKET)

        post = Post(
            userId=current_user.get_id(),
            caption=caption
        )

        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}
