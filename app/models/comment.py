from .db import db
import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey(
        "posts.id"), nullable=False, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False, unique=True)
    content = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    post = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    likes = db.relationship("Like", back_populates="comment")
