from .db import db
import datetime


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    followedId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
# followerId references Users table
# followedId references Users table
# SQLAlchemy belongsTo Users association
