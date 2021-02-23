from flask import Blueprint
from app.models import Comment
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def makeComment():
    comments = Comment.query.all()
    print("comments", comments)
    return {"Comments": [comment.to_dict() for comment in comments]}
