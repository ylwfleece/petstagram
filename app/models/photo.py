from .db import db


class Photo(db.Model):
    __tablename__ = "photos"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, nullable=False, db.ForeignKey("posts.id"))
    photoKey = db.Column(db.String, nullable=False)

# postId references Posts table
# photoKey references Amazon S3
# SQLAlchemy belongsTo Posts association
