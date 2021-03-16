from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=True)
    commentId = db.Column(db.Integer, db.ForeignKey(
        "comments.id"), nullable=True)
    post = db.relationship("Post", back_populates="likes")
    comment = db.relationship("Comment", back_populates="likes")
    user = db.relationship("User", back_populates="likes")

    def comment_info(self, username, profilePhoto):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId,
            "username": username,
            "profilePhoto": profilePhoto
        }
