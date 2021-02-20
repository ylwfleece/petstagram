from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    type = db.Column(db.String, nullable=False)
    contentId = db.Column(db.Integer, nullable=False, db.ForeignKey("posts.id"))
    or
    contentId = db.Column(db.Integer, nullable=False, db.ForeignKey("comments.id"))


# userId references Users table
# if type == 'p':
# contentId references Posts table
# SQLAlchemy belongsTo Posts table
# if type == 'c':
# contentId references Comments table
# SQLAlchemy belongsTo Comments table
# SQLAlchemy belongsTo Users association
