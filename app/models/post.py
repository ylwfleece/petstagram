from .db import db


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False, unique=True, db.ForeignKey("users.id"))
    caption = db.Column(db.String)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

# userId references Users table
# SQLAlchemy belongsTo Users association
# SQLAlchemy hasMany Photos association
# SQLAlchemy hasMany Comments association
# SQLAlchemy hasMAny Likes association
