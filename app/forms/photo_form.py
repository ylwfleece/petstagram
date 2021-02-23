from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired
from app.models import Photo, Post


class PhotoForm(FlaskForm):
    feed_photo_file = FileField('feed photo', validators=[DataRequired])
    caption = TextAreaField('caption')
