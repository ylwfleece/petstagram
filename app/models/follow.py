from .db import db


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    followedId = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))

# followerId references Users table
# followedId references Users table
# SQLAlchemy belongsTo Users association
