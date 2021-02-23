from app.models import db, Comment
from faker import Faker
import random


fake = Faker()


def seed_comments(n):
    for _ in range(n):
        entry = Comment(
            postId=random.randint(1, 20), userId=random.randint(1, 20), content=fake.text(max_nb_chars=140)
        )
        db.session.add(entry)

    post1 = Comment(postId=1, userId=1, content="lorem ipsum")

    db.session.add(post1)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.execute("ALTER SEQUENCE comments_id_seq RESTART WITH 1")
    db.session.commit()
