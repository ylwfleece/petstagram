from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Photo


class PhotoForm(FlaskForm):
    feed_photo_file = FileField('profile photo',  validators=[DataRequired()]),
    caption = StringField('caption')
