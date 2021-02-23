from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
# from werkzeug.security import secure_filename
from ..helpers import *
from ..config import Config

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    # jsdata = request.form['javascript_data']
    # print(jsdata)
    # print("Request.data", list(request.form.keys()))


    form = SignUpForm()
    print("Request files",request.files)
    print("form", form)
    # print(request.headers)
    # print(dict(request.form))
    # print("request", request)
    # print("request.data", request.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, form.data["email"])

    if form.validate_on_submit():
        print("made it here")
        s3_photo_url = 'randomphotostring'
        # print(f'-----line 70 auth_routes, form.data: {form.data} -----')

        file = form.data['profile_photo_file']
        if file:
            # file.filename = secure_filename(file.filename)
            # s3_photo_url = upload_file_to_s3(file, Config.S3_BUCKET)
            print(f'-----line 78 auth_routes, s3_photo_url: {s3_photo_url} -----')

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profilePhotoUrl=s3_photo_url
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
