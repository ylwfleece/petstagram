from app.models import db, Like
from faker import Faker
import random


fake = Faker()


def seed_likes(n):
    for i in range(n):
        if (i+1) % 2 == 0:
            post_id = i+1
            comment_id = None
        else:
            post_id = None
            comment_id = i+1
        entry = Like(
            userId=random.randint(1, 20), postId=post_id, commentId=comment_id
        )
        db.session.add(entry)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes CASCADE;')
    db.session.execute("ALTER SEQUENCE likes_id_seq RESTART WITH 1")
    db.session.commit()
