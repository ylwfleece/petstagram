from flask_wtf import FlaskForm
from wtforms import TextAreaField
from app.models import Comment


class CommentForm(FlaskForm):
    content = TextAreaField('comment')
