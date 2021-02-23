from app.models import db, Like
from faker import Faker
import random


fake = Faker()


def seed_likes(n):
    for _ in range(n):
        entry = Like(
            userId=random.randint(1, 20), postId=random.randint(1, 20), commentId=1
        )
        db.session.add(entry)
    post1 = Like(userId=1, postId=1, commentId=1)

    db.session.add(post1)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes CASCADE;')
    db.session.execute("ALTER SEQUENCE likes_id_seq RESTART WITH 1")
    db.session.commit()
