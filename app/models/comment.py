from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, nullable=False, unique=True, db.ForeignKey("posts.id"))
    userId = db.Column(db.Integer, nullable=False, unique=True, db.ForeignKey("users.id"))
    content = db.Column(db.String, nullable=False)
    post = db.Relationship("Post")
    user = db.Relationship("User")

# userId references Users table
# postId references Posts table
# SQLAlchemy belongsTo Users association
# SQLAlchemy belongsTo Posts association
# SQLAlchemy hasMany Likes association
