from flask import Blueprint
from app.models import Comment, db
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def makeComment():
    comments = Comment.query.all()
    print(comments)
    return {"Comments": [comment.to_dict() for comment in comments]}
