from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField
# from flask_wtf.file import FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    print("Flask Form 18")
    username = StringField('username', validators=[DataRequired()])
    print("Flask Form 19")
    email = StringField('email', validators=[DataRequired(), user_exists])
    print("Flask Form 20")
    password = StringField('password', validators=[DataRequired()])
    print("Flask Form 21")
    profile_photo_file = FileField('profile photo')
    print("Flask Form 22")

    def __repr__(self):
        return f'{self.username} + {self.email} + {self.password } {self.profile_photo_file}'