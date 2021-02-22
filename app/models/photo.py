from .db import db
import datetime


class Photo(db.Model):
    __tablename__ = "photos"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    photoKey = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    post = db.relationship("Post", back_populates="photos")
