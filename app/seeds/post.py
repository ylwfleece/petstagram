from app.models import db, Post
from faker import Faker
import random


fake = Faker()


def seed_posts(n):
    for _ in range(n):
        entry = Post(
            userId=random.randint(1, 20), caption=fake.text(max_nb_chars=140)
        )
        db.session.add(entry)
    post1 = Post(userId=1, caption="hello world")

    db.session.add(post1)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.execute("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
    db.session.commit()
