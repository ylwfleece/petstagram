from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
follows = db.Table(
    "follows",
    db.Column("followerId", db.Integer, db.ForeignKey("users.id")),
    db.Column("followedId", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profilePhotoUrl = db.Column(db.String, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.utcnow)
    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followerId == id),
        secondaryjoin=(follows.c.followedId == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
