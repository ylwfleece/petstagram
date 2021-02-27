from flask import Blueprint, jsonify, request
from app.forms import PhotoForm
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from ..helpers import *
from ..config import Config
from app.models import Post, User, Photo, Like, db
# from app.forms import PhotoForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["GET"])
# @login_required
def get_posts():
    user = User.query.get(current_user.id)
    followers = user.followers
    # people the user follows
    # follows = user.follows (people who follow the user)
    ids_to_query = [int(current_user.id)]
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
        photos_for_post = Photo.query.filter(Photo.postId == post.id).all()
        photo_urls = []
        for photo in photos_for_post:
            photo_urls.append(photo.photoKey)
        likes = Like.query.filter(Like.postId == post.id).all()
        like_count = len(likes)
        poster_photo = post.user.profilePhotoUrl
        username = post.user.username
        posts_to_return.append(post.to_dict(photo_urls, like_count, poster_photo, username))
    return jsonify(posts_to_return)


@post_routes.route('/', methods=["POST"])
@login_required
def create_post():

    form = PhotoForm()

    file = request.files.get("feed_photo_file")
    if(not file):
        return "Failed to load file"
    caption = request.form.get('caption')

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # file = form.data['feed_photo_file']
        post = Post(
            userId=current_user.id,
            caption=caption,
        )
        photoKey = ""
        if file:
            file.filename = secure_filename(file.filename)
            s3_photo_url = upload_file_to_s3(file, Config.S3_BUCKET)
            photoKey = s3_photo_url
        db.session.add(post)
        db.session.commit()
        postId = post.id
        photo = Photo(photoKey=photoKey, postId=postId)
        db.session.add(photo)
        db.session.commit()
        return jsonify(post.to_dict([s3_photo_url], 0, current_user.profilePhotoUrl, current_user.username))
    return {'errors': validation_errors_to_error_messages(form.errors)}


@post_routes.route('/delete/<int:post_id>', methods=["GET"])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post.userId == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return 'delete post'
    else:
        return 'not allowed to delete this post'
